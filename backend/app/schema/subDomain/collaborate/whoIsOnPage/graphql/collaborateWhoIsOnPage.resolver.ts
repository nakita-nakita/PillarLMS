import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain } from "../../../../utils/types/dependencyInjection.types";
import emptyTestDomainDb from "../../../../../models/domain/_test/emptyTestDb";
import makeCollaborateWhoIsOnPageMain from "../main/collaborateWhoIsOnPage.main";

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
    loggers: [console],
    errorHandler: sequelizeErrorHandler
  }
}

const collaborateWhoIsOnPageResolver = {
  Query: {
    collaborateWhoIsOnPage_getAllUsersFromPage: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeCollaborateWhoIsOnPageMain(d)

      const response = await main.getAllUsersFromPage({
        url: args.url
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
  },
};

export default collaborateWhoIsOnPageResolver