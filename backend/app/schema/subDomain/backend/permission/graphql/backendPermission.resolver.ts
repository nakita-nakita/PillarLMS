import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../utils/types/dependencyInjection.types";
import makeBackendPermissionMain from "../main/backendPermission.main";

const makeDObj = async (): Promise<d_sub> => {
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  const transaction = await subDomainDb.transaction();

  return {
    subDomainDb,
    transaction,
    loggers: [console],
    errorHandler: sequelizeErrorHandler
  }
}

const backendPermissionGqlResolver = {
  Query: {
    backendPermission_getOneById: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeBackendPermissionMain(d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        d.transaction.commit()
        return response.data.dataValues

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendPermission_getManyWithPagination: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendPermissionMain(d)

      const response = await main.getManyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        d.transaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    }
  },
  Mutation: {
    backendPermission_addOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendPermissionMain(d)

      const response = await main.addOne({
        name: args.name,
      })

      if (response?.success) {
        d.transaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendPermission_updateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendPermissionMain(d)

      const response = await main.updateOne({
        id: args.id,
        name: args.name,
      })

      if (response?.success) {
        d.transaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendPermission_deleteOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendPermissionMain(d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        d.transaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    }
  },
};

export default backendPermissionGqlResolver