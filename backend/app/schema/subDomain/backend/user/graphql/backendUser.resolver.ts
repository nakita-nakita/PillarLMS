import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeBackendUserMain from "../main/backendUser.main";
import makeBackendUserBasicViewMain from "../main/backendUserBasicView.main";
import makeBackendUserManyPermissionMain from "../main/backendUserManyPermission.main";
import makeBackendUserManyRoleMain from "../main/backendUserManyRole.main";
import makeBackendUserProfileMain from "../main/backendUserProfile.main";



const userResolver = {
  Query: {
    backendUser_getOneById: async (parent, args, ctx) => {

      const main = makeBackendUserMain(ctx.d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendUser_getManyWithPagination: async (parent, args, ctx) => {

      const main = makeBackendUserMain(ctx.d)

      const response = await main.getManyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendUserBasicView_me: async (parent, args, ctx) => {

      const main = makeBackendUserBasicViewMain(ctx.d)

      const response = await main.me({
        id: ctx.user.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendUserBasicView_them: async (parent, args, ctx) => {

      const main = makeBackendUserBasicViewMain(ctx.d)

      const response = await main.them({
        id: args.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendUserManyPermission_getAll: async (parent, args, ctx) => {

      const main = makeBackendUserManyPermissionMain(ctx.d)

      const response = await main.getAll({
        id: args.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendUserManyRole_getAll: async (parent, args, ctx) => {

      const main = makeBackendUserManyRoleMain(ctx.d)

      const response = await main.getAll({
        id: args.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendUserProfile_getOneById: async (parent, args, ctx) => {

      const main = makeBackendUserProfileMain(ctx.d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    }
  },
  Mutation: {
    backendRole_addOne: async (parent, args, ctx) => {

      const main = makeBackendUserMain(ctx.d)

      const response = await main.addOne({
        email: args.email,
        password: args.password,
        username: args.username,
        isAdmin: args.isAdmin,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },

    backendRole_updateOne: async (parent, args, ctx) => {

      const main = makeBackendUserMain(ctx.d)

      const response = await main.updateOne({
        id: args.id,
        email: args.email,
        password: args.password,
        username: args.username,
        isAdmin: args.isAdmin,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendRole_deleteOne: async (parent, args, ctx) => {

      const main = makeBackendUserMain(ctx.d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendUserManyPermission_setList: async (parent, args, ctx) => {

      const main = makeBackendUserManyPermissionMain(ctx.d)

      const response = await main.setList(args.list)

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendUserManyRole_setList: async (parent, args, ctx) => {

      const main = makeBackendUserManyRoleMain(ctx.d)

      const response = await main.setList(args.list)

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendUserProfile_deactivateOne: async (parent, args, ctx) => {

      const main = makeBackendUserProfileMain(ctx.d)

      const response = await main.deactivateOne({
        id: args.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendUserProfile_reactivateOne: async (parent, args, ctx) => {

      const main = makeBackendUserProfileMain(ctx.d)

      const response = await main.reactivateOne({
        id: args.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendUserProfile_updateOne: async (parent, args, ctx) => {

      const main = makeBackendUserProfileMain(ctx.d)

      const response = await main.updateOne({
        id: args.id,
        // birthday: args.birthday,
        // location: args.location,
        // picture: args.picture,
        // username: args.username,
        // website: args.website,
        callByType: args.callByType,
        circleColor: args.circleColor,
        firstName: args.firstName,
        labelColor: args.labelColor,
        lastName: args.lastName,
        picture: args.picture,
        username: args.username,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
  }
};

export default userResolver;