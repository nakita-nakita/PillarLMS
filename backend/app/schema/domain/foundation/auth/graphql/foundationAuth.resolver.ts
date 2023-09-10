import { Sequelize } from "sequelize-typescript";
import emptyTestDomainDb from "../../../../../models/domain/_test/emptyTestDb";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../utils/errorHandling/handers/graphql.errorhandler"
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_domain } from "../../../../utils/types/dependencyInjection.types";
import makeFoundationAuthMain from "../main/foundationAuth.main";



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


const foundation_authResolver = {
  Mutation: {
    foundationAuth_signup: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeFoundationAuthMain(d)

      const response = await main.signup({
        email: args.email,
        password: args.password,
        confirmPassword: args.confirmPassword,
      })

      if (response?.success) {
        d.transaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    foundationAuth_signin: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeFoundationAuthMain(d)

      const response = await main.signin({
        email: args.email,
        password: args.password,
      })

      if (response?.success) {
        d.transaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    foundationAuth_forgotPassword: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeFoundationAuthMain(d)

      const response = await main.forgotPassword({
        email: args.email,
      })

      if (response?.success) {
        d.transaction.commit()
        return response

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    foundationAuth_isTokenValid: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeFoundationAuthMain(d)

      const response = await main.isTokenValid({
        token: args.token
      })

      if (response?.success) {
        d.transaction.commit()
        return response

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
  },
};

export default foundation_authResolver