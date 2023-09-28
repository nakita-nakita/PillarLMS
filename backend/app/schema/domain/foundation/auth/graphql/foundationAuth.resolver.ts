import { Sequelize } from "sequelize-typescript";
import emptyTestDomainDb from "../../../../../models/domain/_test/emptyTestDb";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../utils/errorHandling/handers/graphql.errorhandler"
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain, d_domain } from "../../../../utils/types/dependencyInjection.types";
import makeFoundationAuthMain from "../main/foundationAuth.main";



const makeDObj = async (): Promise<d_allDomain> => {
  const domainDb: Sequelize = await emptyTestDomainDb();
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  const domainTransaction = await domainDb.transaction();
  const subDomainTransaction = await subDomainDb.transaction()

  return {
    domainDb,
    subDomainDb,
    domainTransaction,
    subDomainTransaction,
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
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
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
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
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
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
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
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
  },
};

export default foundation_authResolver