import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain } from "../../../../utils/types/dependencyInjection.types";
import emptyTestDomainDb from "../../../../../models/domain/_test/emptyTestDb";
import singletonCachingService from "../../../../../singleton.ram-cache";
import makeCollaborateSamePageMain from "../main/collaborateSamePage.main";
// import makeBackendPermissionMain from "../main/backendPermission.main";

const makeDObj = async (): Promise<d_allDomain> => {
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  const subDomainTransaction = await subDomainDb.transaction();
  const domainDb = await emptyTestDomainDb()
  const domainTransaction = await domainDb.transaction();

  return {
    domainDb,
    domainTransaction,
    subDomainDb,
    subDomainTransaction,
    cacheService: singletonCachingService,
    loggers: [console],
    errorHandler: sequelizeErrorHandler
  }
}

const backendPermissionGqlResolver = {
  Query: {
    collaborateSamePage_getAllUsersFromPage: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeCollaborateSamePageMain(d)

      const response = await main.getAllUsersFromPage({
        url: args.url
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
    collaborateSamePage_addUserToPage: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeCollaborateSamePageMain(d)

      const response = await main.addUserToPage({
        userId: args.userId,
        url: args.url,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    collaborateSamePage_removeUserFromPage: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeCollaborateSamePageMain(d)

      const response = await main.removeUserFromPage({
        userId: args.userId,
        url: args.url,
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
};

export default backendPermissionGqlResolver