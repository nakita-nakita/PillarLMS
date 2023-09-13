import { Sequelize } from "sequelize-typescript";
import emptyTestDomainDb from "../../../../../models/domain/_test/emptyTestDb";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../utils/errorHandling/handers/graphql.errorhandler"
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_domain } from "../../../../utils/types/dependencyInjection.types";
import makeFoundationUserProfileMain from "../main/foundationUserProfile.main";



const makeDObj = async (): Promise<d_domain> => {
  const domainDb: Sequelize = await emptyTestDomainDb();
  const domainTransaction = await domainDb.transaction();

  return {
    domainDb,
    domainTransaction,
    loggers: [console],
    errorHandler: sequelizeErrorHandler,
  }
}


const backend_authResolver = {
  Query: {
    foundationUserProfile_getOne: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeFoundationUserProfileMain(d)

      const response = await main.getOneById({
        id: ctx.user.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    foundationUserProfile_updateOne: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeFoundationUserProfileMain(d)

      const response = await main.upsertOne({
        id: ctx.user.id,
        firstName: args.firstName,
        lastName: args.lastName,
        username: args.username,
        picture: args.picture,
        callByType: args.callByType,
        circleColor: args.circleColor,
        labelColor: args.labelColor,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        return graphqlError(response)
      }
    },
  },
};
export default backend_authResolver