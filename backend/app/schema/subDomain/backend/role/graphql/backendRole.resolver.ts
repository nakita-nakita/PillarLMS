import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeBackendRoleMain from "../main/backendRole.main";
import makeBackendRoleManyPermissionMain from "../main/backendRoleManyPermission.main";



const backendRoleGqlResolver = {
  Query: {
    backendPermission_getOneById: async (parent, args, ctx) => {

      const main = makeBackendRoleMain(ctx.d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendRole_getManyWithPagination: async (parent, args, ctx) => {

      const main = makeBackendRoleMain(ctx.d)

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
  },
  BackendRoleType: {
    permission_getAll: async (parent, args, ctx) => {

      const main = makeBackendRoleManyPermissionMain(ctx.d)

      const response = await main.getAll({
        roleId: parent.id,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendRole_addOne: async (parent, args, ctx) => {

      const main = makeBackendRoleMain(ctx.d)

      const response = await main.addOne({
        name: args.name,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendRole_updateOne: async (parent, args, ctx) => {

      const main = makeBackendRoleMain(ctx.d)

      const response = await main.updateOne({
        id: args.id,
        name: args.name,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendRole_deleteOne: async (parent, args, ctx) => {

      const main = makeBackendRoleMain(ctx.d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendRoleManyPermission_addOne: async (parent, args, ctx) => {

      const main = makeBackendRoleManyPermissionMain(ctx.d)

      const response = await main.addOne({
        roleId: args.roleId,
        permissionId: args.permisisonId,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendRoleManyPermission_deleteOne: async (parent, args, ctx) => {

      const main = makeBackendRoleManyPermissionMain(ctx.d)

      const response = await main.deleteOne({
        roleId: args.roleId,
        permissionId: args.permisisonId,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendRoleManyPermission_setList: async (parent, args, ctx) => {

      const main = makeBackendRoleManyPermissionMain(ctx.d)

      const response = await main.setList(args.roleManyPermissionArray)

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  }
};

export default backendRoleGqlResolver