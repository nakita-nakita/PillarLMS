import { Sequelize } from "sequelize-typescript";
import emptyTestDomainDb from "../../../../../models/domain/_test/emptyTestDb";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../utils/errorHandling/handers/graphql.errorhandler"
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain, d_domain } from "../../../../utils/types/dependencyInjection.types";
import makeFoundationUserMain from "../main/foundationUser.main";


const makeDObj = async (): Promise<d_domain> => {
  const domainDb: Sequelize = await emptyTestDomainDb();
  const transaction = await domainDb.transaction();

  return {
    domainDb,
    transaction,
    loggers: [console],
    errorHandler: sequelizeErrorHandler,
  }
}


const backend_authResolver = {
  Query: {
    foundationUser_getOne: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeFoundationUserMain(d)

      const response = await main.getOneById({
        id: ctx.user.id,
      })

      if (response?.success) {
        d.transaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    foundationUser_deactivateMe: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeFoundationUserMain(d)

      const response = await main.deactivateOne({
        id: ctx.user.id,
      })

      if (response?.success) {
        d.transaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    foundationUser_reactivateMe: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeFoundationUserMain(d)

      const response = await main.reactivateOne({
        id: ctx.user.id,
      })

      if (response?.success) {
        d.transaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
  },
};
export default backend_authResolver