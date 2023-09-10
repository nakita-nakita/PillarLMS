const bcrypt = require("bcryptjs");
const { saveAndSendNotification } = require("../notification");

/**
 * The functions responsible for handling the user type.
 * @module user_logic
 */

 module.exports = (db) => {
  const Op = db.Sequelize.Op;
  /**
   * Find a user with the sequelize "findOne" function.
   * @param {Object} sequelizeSearch - {{where: Object, include: Object}} [Sequelize fineOne Docs](https://sequelize.org/master/manual/model-querying-finders.html#-code-findone--code-)
   * @returns {user}
   * @example 
   *  await userLogic.findOne({
   *    where:{
   *      username: "cool"
   *    }
   *  })
   */
  const findOne = (sequelizeSearch) => {
    return new Promise(async (resolve, reject) => {
      const user = await db.user.findOne(sequelizeSearch);

      resolve(user);
    })
  }


  /**
   * Find a user by Id.
   * @param {Object} param1 - {id: 1}
   * @returns {user}
   * @example 
   *  await userLogic.getOneById({
   *    id: 1
   *  })
   */
  const getOneById = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const user = await db.user.findOne({ where: { id, isDeleted: false } });

      if (user) {
        user.profile = await db.userProfile.findOne({ where: { userId: id } });
      }

      resolve(user);
    })
  }

  /**
   * Find a user by Id.
   * @param {Object} param1 - {email: "email@email.com"}
   * @returns {user}
   * @example 
   *  await userLogic.getOneByEmail({
   *    email: "email@email.com"
   *  })
   */
  const getOneByEmail = ({ email }) => {
    return new Promise(async (resolve, reject) => {
      const user = await db.user.findOne({ where: { email, isDeleted: false } });

      if (user) {
        user.profile = await db.userProfile.findOne({ where: { userId: user.id } });
      }

      resolve(user);
    })
  }

  /**
   * Find many users with pagination.
   * @param {searchParam} firstParam - {id, page, pageSize}
   * @returns {pagination<user>}
   * @example 
   *  await userLogic.getManyWithPagination({
   *    q: "search",
   *    page: 2,
   *    pageSize:2
   *  })
   */
  const getManyWithPagination = ({ q, page, pageSize }) => {
    return new Promise(async (resolve, reject) => {

      page = page ? page - 1 : 0;
      pageSize = pageSize || 10;

      if (page < 0) {
        return new Error("Please start the page at 1.");
      }
      if (pageSize < 0 || pageSize >= 100) {
        return new Error("Please keep pageSize inbetween 1 - 100.");
      }

      const offset = page * pageSize;
      const limit = pageSize;

      let search = {
        where: {
          isDeleted: false,
        },
        include: {
          model: db.userProfile,
          // where: { isDeleted: false },
        }
      };

      if (q) {
        search = {
          where: {
            username: {
              [Op.like]: "%" + q + "%",
            },
            isDeleted: false,
          },
        };
      }

      search.offset = offset;
      search.limit = limit;

      const users = await db.user.findAndCountAll(search);
      users.rows = users.rows.map(user => {
        if (user.users_profile) {
          user.profile = user.users_profile.dataValues
        }

        return user
      })
      users.page = page + 1;
      users.pageSize = pageSize;
      users.pageCount = Math.ceil(users.count / users.pageSize);


      resolve(users)
    })
  }

  /**
   * Save a user. This includes the profile, permissions, and roles
   * @param {user} userObject - { username, email, password, profile, permissionMany, roleMany, overridePassword } It takes all the "user" properties except id.
   * @returns {user} - It returns the same object but with an id.
   * @example 
   *  await userLogic.addOne({
   *    username: "username",
   *    email: "email@email.com",
   *    password: "password",
   *    profile: {
   *      name: "name",
   *      birthday: "birthday",
   *      location: "location",
   *      website: "website",
   *      picture: "picture",
   *    },
   *    permissionMany: [{id:1}, {id:2}],
   *    roleMany: [{id:2}],
   *    // to override the password with an encrypted password
   *    overridePassword,
   *  })
   */
  const addOne = ({ username, email, password, isCreator, isAdmin, profile, permissionMany, roleMany, overridePassword }) => {
    return new Promise(async (resolve, reject) => {

      const userObject = {
        username: username,
        email: email,
        isCreator,
        isAdmin,
        password: password ? bcrypt.hashSync(password, 8) : undefined,
      }

      if (overridePassword) {
        userObject.password = overridePassword;
      }

      const user = await db.user.create(userObject);

      // Save Profile
      const userProfile = db.userProfile.build({ ...profile, userId: user.id });

      const newUserProfile = await userProfile.save();

      user.profile = newUserProfile;


      // Save Permissions
      if (permissionMany) {
        await db.userManyPermission.bulkCreate(permissionMany.map(permission => ({
          userId: user.id,
          permissionId: permission.id,
        })));
      }

      // Save Roles
      if (roleMany) {
        await db.userManyRole.bulkCreate(roleMany.map(role => ({
          userId: user.id,
          roleId: role.id,
        })));
      }

      //recreate user
      // const findNewUser = await getOneById({ id: user.id })

      if (user.isCreator || user.isAdmin) {
        saveAndSendNotification({
          userId: user.id,
          type: "SYSTEM",
          message: "Update your profile picture in your accounts so people can recognize you better.",
          url: user.isAdmin ? "/app/account/?display=admin" : "/app/account/"
        })  
      }
      
      resolve(user);
    })
  }

  /**
   * Save many user. This includes the profile, permissions, and roles
   * @param {Array<usesr>} ArrayOfUsers - { username, email, password, profile, permissionMany, roleMany, overridePassword } It takes all the "user" properties except id.
   * @returns {boolean} - The result is true or false for the completion of the saves.
   * @example 
   *  await userLogic.addMany([{
   *    username: "username",
   *    email: "email@email.com",
   *    password: "password",
   *    profile: {
   *      name: "name",
   *      birthday: "birthday",
   *      location: "location",
   *      website: "website",
   *      picture: "picture",
   *    },
   *    permissionMany: [{id:1}, {id:2}],
   *    roleMany: [{id:2}]
   *    // to override the password with an encrypted password
   *    overridePassword,
   *  }])
   */
  const addMany = (userArray) => {
    return new Promise(async (resolve, reject) => {
      const results = []
      for (var i = 0; i < userArray.length; i++) {
        const user = userArray[i];

        results.push(await addOne({
          username: user.username,
          email: user.email,
          password: user.password,
          isCreator: user.isCreator,
          isAdmin: user.isAdmin,
          profile: user.profile,
          permissionMany: user.permissionMany,
          roleMany: user.roleMany
        }))
      }
      resolve(results)
    })
  }

  /**
   * Update a user. This does not include permissions and roles.
   * @param {user} userObject - { id, username, email, password, profile, permissionMany, roleMany } It takes all the "user" properties. Id is required.
   * @returns {user} 
   * @example 
   *  await userLogic.updateOne([{
   *    id: 1000000000,
   *    username: "username",
   *    email: "email@email.com",
   *    password: "password",
   *    profile: {
   *      name: "name",
   *      birthday: "birthday",
   *      location: "location",
   *      website: "website",
   *      picture: "picture",
   *    },
   *  }])
   */
  const updateOne = ({ id, userId, username, email, isCreator, isAdmin, password, profile }) => {
    return new Promise(async (resolve, reject) => {

      let user = {};

      let where = id ? {id}: undefined;
      where = where ? where : {userId}
      where = {...where, isDeleted: false}


      if (username || email || password) {
        savedUser = await db.user.update(
          {
            username: username,
            email: email,
            password: password ? bcrypt.hashSync(password, 8) : undefined,
            isCreator,
            isAdmin
          },
          {
            where,
            returning: true,
          }
        );

        user = savedUser[0] !== 0 ? savedUser[1][0].dataValues : null
      } else {
        const findUser = await db.user.findOne({ where: id })
        user = findUser ? findUser.dataValues : null
      }

      let userProfile
      // Save Profile
      if (profile) {
        user.profile = (await db.userProfile.update(
          profile,
          {
            where,
            returning: true
          }))[1][0].dataValues;

      }

      resolve(user)
    })
  }

  /**
   * Delete a user. A soft delete from the column "is_deleted" becoming true.
   * @param {Object} param1 - { id } Id is required.
   * @returns {user} 
   * @example 
   *  await userLogic.deleteOne({
   *    id: 1000000000,
   *  })
   */
  const deleteOne = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      const user = await db.user.update(
        { isDeleted: true },
        {
          where: { id, isDeleted: false },
          returning: true,
        }
      );

      resolve(user[0] !== 0 ? user[1][0].dataValues : null)
    })
  }

  /**
   * Add a permission to a user. 
   * @param {Object} param1 - { userId, permissionId } Both are required.
   * @returns {user} 
   * @example 
   *  await userLogic.addPermission({
   *    userId,
   *    permissionId,
   *  })
   */
  const addPermissionOne = ({ userId, permissionId }) => {
    return new Promise(async (resolve, reject) => {
      const newPermissionRelation = db.userManyPermission.build({ userId, permissionId });

      resolve(await newPermissionRelation.save())
    });
  }

  /**
   * Add many permissions to a user. 
   * @param {number} userId - Required
   * @param {Array<Object>} permissionIdArray - [{ permissionId }] Required.
   * @returns {user} 
   * @example 
   *  await userLogic.addPermission(userId, [{
   *    permissionId,
   *  },
   *  {
   *    permissionId,
   *  }
   * ])
   */
  const addPermissionMany = (userId, permissionManyArray) => {
    return new Promise(async (resolve, reject) => {

      const newPermissionRelationships = await db.userManyPermission.bulkCreate(permissionManyArray.map(permission => ({
        userId: userId,
        permissionId: permission.id,
      })));

      resolve(newPermissionRelationships)
    });
  }

  /**
   * Delete a permission from a user. 
   * @param {Object} UserPermissionIdObject - { userId, permissionId } Both are required.
   * @returns {user} 
   * @example 
   *  await userLogic.deletePermission({
   *    userId: 1000000000,
   *    permissionId: 1000000000,
   *  })
   */
  const deletePermissionOne = ({ userId, permissionId }) => {
    return new Promise(async (resolve, reject) => {
      const userManyPermission = await db.userManyPermission.update(
        { isDeleted: true },
        {
          where: { userId, permissionId, isDeleted: false },
          returning: true,
        }
      );

      resolve(userManyPermission[0] !== 0 ? userManyPermission[1][0].dataValues : null)
    });
  }

  /**
   * Delete many permissions from a user. 
   * @param {number} userId - Required
   * @param {Array<Object>} permissionIdArray - [{ permissionId }] Required.
   * @returns {user} 
   * @example 
   *  await userLogic.deletePermissionMany(userId, [
   *    permissionId,
   *  }])
   */
  const deletePermissionMany = (userId, permissionIdsArray) => {
    return new Promise(async (resolve, reject) => {

      for (var i = 0; i < permissionIdsArray.length; i++) {
        const user = await db.userManyPermission.update(
          { isDeleted: true },
          {
            where: { userId, permissionId: permissionIdsArray[i], isDeleted: false },
            returning: true,
            plain: true,
          }
        );
      }

      resolve(true)
    });
  }

  /**
   * Add a role to a user. 
   * @param {Object} roleUserIdObject - { userId, roleId } Both are required.
   * @returns {user} 
   * @example 
   *  await userLogic.addRole({
   *    userId: 1000000000,
   *    roleId: 1000000000,
   *  })
   */
  const addRoleOne = ({ userId, roleId }) => {
    return new Promise(async (resolve, reject) => {
      const newRoleRelation = db.userManyRole.build({ userId, roleId });

      resolve(await newRoleRelation.save())
    });
  }

  /**
   * Add many roles to a user. 
   * @param {number} userId - Required
   * @param {Array<Object>} roleUserIdObject - [{ roleId }] Required.
   * @returns {user} 
   * @example 
   *  await userLogic.addRoleMany([{
   *    userId: 1000000000,
   *    roleId: 1000000000,
   *  }])
   */
  const addRoleMany = ({ userId, roleManyArray }) => {
    return new Promise(async (resolve, reject) => {

      const newRoleRelationships = await db.userManyRole.bulkCreate(roleManyArray.map(role => ({
        userId: userId,
        roleId: role.id,
      })));

      resolve(newRoleRelationships)
    });
  }

  /**
   * Delete a role from a user. 
   * @param {Object} roleUserIdObject - { userId, roleId } Both are required.
   * @returns {user} 
   * @example 
   *  await userLogic.deleteRole({
   *    userId: 1000000000,
   *    roleId: 1000000000,
   *  })
   */
  const deleteRoleOne = ({ userId, roleId }) => {
    return new Promise(async (resolve, reject) => {
      const userManyRole = await db.userManyRole.update(
        { isDeleted: true },
        {
          where: { userId, roleId, isDeleted: false },
          returning: true,
        }
      );

      resolve(userManyRole[0] !== 0 ? userManyRole[1][0].dataValues : null)
    });
  }

  /**
   * Delete many roles from a user. 
   * @param {number} userId - Required
   * @param {Array<Object>} roleIdArray - [{ roleId }] Required.
   * @returns {user} 
   * @example 
   *  await userLogic.deleteRoleMany([{
   *    userId: 1000000000,
   *    roleId: 1000000000,
   *  }])
   */
  const deleteRoleMany = ({ userId, roleIdsArray }) => {
    return new Promise(async (resolve, reject) => {

      for (var i = 0; i < roleIdsArray.length; i++) {
        const userManyRole = await db.userManyRole.update(
          { isDeleted: true },
          {
            where: { userId, roleId: roleIdsArray[i], isDeleted: false },
            returning: true,
            plain: true,
          }
        );
      }

      resolve(true)
    });
  }


  return {
    findOne,
    getOneById,
    getOneByEmail,
    getManyWithPagination,
    addOne,
    addMany,
    updateOne,
    deleteOne,
    // permissions
    addPermissionOne,
    addPermissionMany,
    deletePermissionOne,
    deletePermissionMany,
    // roles
    addRoleOne,
    addRoleMany,
    deleteRoleOne,
    deleteRoleMany,
  }
}