const db = require('../../../models');
const makeAuthValidation = require('../../auth/auth.validation')
const makeUserValidation = require("./user.validation")
const makeUserLogic = require("./user.logic")
const makeRoleValidation = require("../role/role.validation")
const makeRoleLogic = require("../role/role.logic")
const makePermissionValidation = require("../user/permission.validation")
const makePermissionLogic = require('../user/permission.logic')
const { errorHandler } = require('../../utils');
const { getOneById } = require('./user.main');

const userValidation = makeUserValidation(db)
const userLogic = makeUserLogic(db)
const roleValidation = makeRoleValidation(db)
const roleLogic = makeRoleLogic(db)
const permissionValidation = makePermissionValidation(db)
const permissionLogic = makePermissionLogic(db)
const authValidation = makeAuthValidation(db)


const userResolver = {
  Query: {
    user: async (parent, args) => {

      const user = await getOneById({id: args.id})

      return user
    },
    userMany: async (parent, args) => {

      const users = await userLogic.getManyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      return users
    },
    userAvatarChip: async (parent, args) => {

      const user = await userLogic.getOneById({
        id: args.id
      })

      return {username: user.username, profile_picture: user?.profile?.picture }
    },
    userMyself: async (parent, args, context) => {
      const user = await userLogic.getOneById({
        id: context.user.id
      })

      return user
    }
    
  },
  UserType: {
    permissionMany: async (parent, args) => {

      const permissions = await permissionLogic.getManyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
        userId: parent.id,
      })

      return permissions
    },
    roleMany: async (parent, args) => {

      const roles = await roleLogic.getManyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
        userId: parent.id,
      })

      return roles
    }
  },
  Mutation: {
    userAdd: async (parent, args) => {
      try {
        const isPasswordValid = await authValidation.isPasswordValid(args.password);
        if (!isPasswordValid.result) {
          return Error(isPasswordValid.data)
        }

        const isEmailValid = await authValidation.isEmailValid(args.email);
        if (!isEmailValid.result) {
          return Error("Please use a proper formated email.");
        }

        const isEmailUnique = await authValidation.isEmailUnique(args.email);
        if (!isEmailUnique.result) {
          return Error("Please select a different email.")
        }

        const isUsernameUnique = await authValidation.isUsernameUnique(args.username)
        if (!isUsernameUnique.result) {
          return Error("Please select a different username.")
        }

        const user = await userLogic.addOne({
          username: args.username,
          email: args.email,
          password: args.password,
          profile: args.profile,
          permissionMany: args.permissionMany,
          roleMany: args.roleMany
        });

        return user;
      } catch (error) {
        errorHandler({ error })
      }
    },
    userUpdate: async (parent, args, ctx) => {

      if (args.ctpassword) {
        const isPasswordValid = await authValidation.isPasswordValid(args.password);
        if (!isPasswordValid.result) {
          return Error(isPasswordValid.data)
        }
      }

      if (args.email) {
        const isEmailValid = await authValidation.isEmailValid(args.email);
        if (!isEmailValid.result) {
          return Error("Please use a proper formated email.");
        }

        const isEmailUnique = await authValidation.isEmailUnique(args.email);
        if (!isEmailUnique.result) {
          return Error("Please select a different email.")
        }
      }

      if (args.username) {
        const isUsernameUnique = await authValidation.isUsernameUnique(args.username)
        if (!isUsernameUnique.result) {
          return Error("Please select a different username.")
        }
      }

      const user = await userLogic.updateOne({
        id: args.id,
        username: args.username,
        email: args.email,
        password: args.password,
        profile: args.profile,
        permissionMany: args.permissionMany,
        roleMany: args.roleMany
      })

      return user ? user : Error("Nothing to update.")

    },
    userUpdateMyUser: async (parent, args, ctx) => {

      if (args.ctpassword) {
        const isPasswordValid = await authValidation.isPasswordValid(args.password);
        if (!isPasswordValid.result) {
          return Error(isPasswordValid.data)
        }
      }

      if (args.email) {
        const isEmailValid = await authValidation.isEmailValid(args.email);
        if (!isEmailValid.result) {
          return Error("Please use a proper formated email.");
        }

        const isEmailUnique = await authValidation.isEmailUnique(args.email);
        if (!isEmailUnique.result) {
          return Error("Please select a different email.")
        }
      }

      if (args.username) {
        const isUsernameUnique = await authValidation.isUsernameUnique(args.username)
        if (!isUsernameUnique.result) {
          return Error("Please select a different username.")
        }
      }

      const user = await userLogic.updateOne({
        id: ctx.user.id,
        username: args.username,
        email: args.email,
        password: args.password,
        profile: args.profile,
        permissionMany: args.permissionMany,
        roleMany: args.roleMany
      })

      return user ? user : Error("Nothing to update.")
    },
    userDelete: async (parent, args) => {
      const user = await userLogic.deleteOne({
        id: args.id
      })

      return user ? user : Error("Nothing to delete.")
    },



    userAddPermission: async (parent, args) => {
      try {
        //does the permission exist
        const isIdValid = await permissionValidation.isIdValid(args.permissionId)
        if (!isIdValid.result) {
          return Error("Permission ID is not valid.")
        }

        const doesUserHavePermission = await userValidation.doesUserHavePermission({
          userId: args.userId,
          permissionId: args.permissionId
        })

        if (doesUserHavePermission.result) {
          return Error("This user already has this permission.")
        }

        await userLogic.addPermissionOne({
          userId: args.userId,
          permissionId: args.permissionId
        })

        const permission = await permissionLogic.getOneById({
          id: args.permissionId
        })

        return permission

      } catch (err) {
        console.log(err)
      }
    },
    userRemovePermission: async (parent, args) => {
      const permissionRemovedFromUser = await userLogic.deletePermissionOne({
        userId: args.userId,
        permissionId: args.permissionId
      })

      const permission = await permissionLogic.getOneById({
        id: args.permissionId
      })

      return permission
    },


    userAddRole: async (parent, args) => {
      try {
        //does the role exist
        const isIdValid = await roleValidation.isIdValid(args.roleId)
        if (!isIdValid.result) {
          return Error("Role ID is not valid.")
        }

        const doesUserHaveRole = await userValidation.doesUserHaveRole({
          userId: args.userId,
          roleId: args.roleId
        })

        if (doesUserHaveRole.result) {
          return Error("This user already has this role.")
        }

        await userLogic.addRoleOne({
          userId: args.userId,
          roleId: args.roleId
        })

        const role = await roleLogic.getOneById({
          id: args.roleId
        })

        return role

      } catch (err) {
        console.log(err)
      }
    },
    userRemoveRole: async (parent, args) => {
      const roleRemovedFromUser = await userLogic.deleteRoleOne({
        userId: args.userId,
        roleId: args.roleId
      })

      const role = await roleLogic.getOneById({
        id: args.roleId
      })

      return role
    }
  },

};

module.exports = userResolver;