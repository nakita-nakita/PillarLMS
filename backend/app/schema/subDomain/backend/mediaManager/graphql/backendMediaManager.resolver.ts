import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../utils/types/dependencyInjection.types";
import makeBackendMediaManagerFileMain from "../main/backendMediaManagerFile.main";
import makeBackendMediaManagerFolderMain from "../main/backendMediaManagerFolder.main";

const makeDObj = async (): Promise<d_sub> => {
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  const subDomainTransaction = await subDomainDb.transaction();

  return {
    subDomainDb,
    subDomainTransaction,
    loggers: [console],
    errorHandler: sequelizeErrorHandler
  }
}

const backendMediaManagerGqlResolver = {
  Query: {
    backendMediaManagerFile_getOneById: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeBackendMediaManagerFileMain(d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendMediaManagerFile_viewTrash: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendMediaManagerFileMain(d)

      const response = await main.viewTrashed()

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendMediaManagerFile_getMany: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendMediaManagerFileMain(d)

      const response = await main.getMany({
        folderId: args.folderId,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendMediaManagerFolder_getMany: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendMediaManagerFolderMain(d)

      const response = await main.getMany({
        folderId: args.folderId,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendMediaManagerFolder_getBreadCrumb: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendMediaManagerFolderMain(d)

      const response = await main.getBreadCrumb({
        id: args.folderId,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendMediaManagerFile_rename: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendMediaManagerFileMain(d)

      const response = await main.updateOne({
        id: args.id,
        userFileName: args.name,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendMediaManagerFile_deleteOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendMediaManagerFileMain(d)

      const response = await main.deleteOne({
        id: args.id,
        deletedBy: ctx.user.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.success

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendMediaManagerFolder_addOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendMediaManagerFolderMain(d)

      const response = await main.addOne({
        name: args.name,
        folderId: args.folderId,
        createdBy: ctx.user.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendMediaManagerFolder_rename: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendMediaManagerFolderMain(d)

      const response = await main.updateOne({
        id: args.id,
        name: args.name,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendMediaManagerFolder_deleteOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendMediaManagerFolderMain(d)

      const response = await main.deleteOne({
        id: args.id,
        deletedBy: ctx.user.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendMediaManagerFile_restoreTrashed: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendMediaManagerFileMain(d)

      const response = await main.restoreTrashed({
        id: args.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return true

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
  }
};

export default backendMediaManagerGqlResolver