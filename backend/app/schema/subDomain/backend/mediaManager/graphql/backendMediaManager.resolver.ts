import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeBackendMediaManagerFileMain from "../main/backendMediaManagerFile.main";
import makeBackendMediaManagerFolderMain from "../main/backendMediaManagerFolder.main";


const backendMediaManagerGqlResolver = {
  Query: {
    backendMediaManagerFile_getOneById: async (parent, args, ctx) => {

      const main = makeBackendMediaManagerFileMain(ctx.d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        return response.data.dataValues

      } else {
        return graphqlError(response)
      }
    },
    backendMediaManagerFile_viewTrash: async (parent, args, ctx) => {

      const main = makeBackendMediaManagerFileMain(ctx.d)

      const response = await main.viewTrashed()

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendMediaManagerFile_getMany: async (parent, args, ctx) => {

      const main = makeBackendMediaManagerFileMain(ctx.d)

      const response = await main.getMany({
        folderId: args.folderId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendMediaManagerFolder_getMany: async (parent, args, ctx) => {

      const main = makeBackendMediaManagerFolderMain(ctx.d)

      const response = await main.getMany({
        folderId: args.folderId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendMediaManagerFolder_getBreadCrumb: async (parent, args, ctx) => {

      const main = makeBackendMediaManagerFolderMain(ctx.d)

      const response = await main.getBreadCrumb({
        id: args.folderId,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendMediaManagerFile_rename: async (parent, args, ctx) => {

      const main = makeBackendMediaManagerFileMain(ctx.d)

      const response = await main.updateOne({
        id: args.id,
        userFileName: args.name,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendMediaManagerFile_deleteOne: async (parent, args, ctx) => {

      const main = makeBackendMediaManagerFileMain(ctx.d)

      const response = await main.deleteOne({
        id: args.id,
        deletedBy: ctx.user.id,
      })

      if (response?.success) {
        return response.success

      } else {
        return graphqlError(response)
      }
    },
    backendMediaManagerFolder_addOne: async (parent, args, ctx) => {

      const main = makeBackendMediaManagerFolderMain(ctx.d)

      const response = await main.addOne({
        name: args.name,
        folderId: args.folderId,
        createdBy: ctx.user.id,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendMediaManagerFolder_rename: async (parent, args, ctx) => {

      const main = makeBackendMediaManagerFolderMain(ctx.d)

      const response = await main.updateOne({
        id: args.id,
        name: args.name,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    backendMediaManagerFolder_deleteOne: async (parent, args, ctx) => {

      const main = makeBackendMediaManagerFolderMain(ctx.d)

      const response = await main.deleteOne({
        id: args.id,
        deletedBy: ctx.user.id,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    backendMediaManagerFile_restoreTrashed: async (parent, args, ctx) => {

      const main = makeBackendMediaManagerFileMain(ctx.d)

      const response = await main.restoreTrashed({
        id: args.id,
      })

      if (response?.success) {
        return true

      } else {
        return graphqlError(response)
      }
    },
  }
};

export default backendMediaManagerGqlResolver