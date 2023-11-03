// need to abstract this down one layer so the same security functions can be used throughout socket/controller/graphql system.

const { rule } = require("graphql-shield");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { makeDObj } = require("../schema/utils/dependencies/makeDependency");
// const { makeDObj } = require("../schema/utils/dependencies/makeDependency.js");
// const findSecret = require("../schema/domain/foundation/auth/preMain/scripts/func/findSecret.private.js");
// const db = require("../models/subDomain");
// const makeToDoLogic = require("../schema/app/toDo/toDo.logic")
// const makeToDoListLogic = require("../schema/app/toDoList/toDoList.logic")
// const makeUserLogic = require("../schema/user/user/user.logic");
// const makeRoleLogic = require("../schema/user/role/role.logic");
// const makePermissionLogic = require("../schema/user/permission/permission.logic.js");

// const toDoLogic = makeToDoLogic(db)
// const toDoListLogic = makeToDoListLogic(db)
// const userLogic = makeUserLogic(db)
// const roleLogic = makeRoleLogic(db)
// const permissionLogic = makePermissionLogic(db)

const getClaim = (ctx) => {
  return new Promise(async (resolve, reject) => {
    try {
      // import findSecret from "./findSecret.private"

      if (ctx.user) {
        return resolve(ctx.user)
      }

      ctx.d = await makeDObj()

      let token = ctx.headers["Authorization"] || ctx.headers["authorization"];

      if (!token) {
        return reject("No token provided!");
      }

      token = token.split(" ").filter((el) => el.length != 0)[1];

      const decoded = await jwt.verify(token, process.env.APP_SECRET);

      ctx.user = ctx.user || {
        id: decoded.userId
      };

      resolve(ctx.user);
    } catch (err) {
      console.log(err);
      // reject(err.message);
      reject("Not Authorized!")
    }
  });
};

const isPublic = rule()(async (parent, args, ctx, info) => {
  ctx.d = await makeDObj()

  return true
})

const hasPermissions = (permissionArray) => {

  return rule()(async (parent, args, ctx, info) => {

    ctx.d = await makeDObj()

    return true
  })
}

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  try {
    const user = await getClaim(ctx);

    return true;
  } catch (err) {
    console.log(err);
    return Error(err);
  }
});

const isAdmin = rule()(async (parent, args, ctx, info) => {
  try {
    const user = await getClaim(ctx);

    return user.isAdmin;
  } catch (err) {
    console.log(err);
    return Error(err);
  }
});

const isOwnerOfToDoList = rule()(async (parent, args, ctx, info) => {
  try {
    const user = await getClaim(ctx);

    let toDoList;

    if (args.id) {
      toDoList = await toDoListLogic.getOneById({ id: args.id })
    }

    if (args.toDoId) {
      const toDo = await toDoLogic.getOneById({ id: args.toDoId })

      toDoList = await toDoListLogic.getOneById({ id: toDo.toDoListId })
    }



    return user.id === toDoList.userId;
  } catch (err) {
    console.log(err);
    return Error(err);
  }
});


module.exports = {
  isAuthenticated,
  isAdmin,
  isPublic,
  isOwnerOfToDoList,
  hasPermissions,
};
