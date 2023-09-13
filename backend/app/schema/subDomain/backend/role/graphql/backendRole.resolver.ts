import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../utils/types/dependencyInjection.types";
import makeBackendRoleMain from "../main/backendRole.main";
import makeBackendRoleManyPermissionMain from "../main/backendRoleManyPermission.main";


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

const backendRoleGqlResolver = {
  Query: {
    backendPermission_getOneById: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendRoleMain(d)

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
    backendRole_getManyWithPagination: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendRoleMain(d)

      const response = await main.getManyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
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
  BackendRoleType: {
    permission_getAll: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendRoleManyPermissionMain(d)

      const response = await main.getAll({
        roleId: parent.id,
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
    backendRole_addOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendRoleMain(d)

      const response = await main.addOne({
        name: args.name,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendRole_updateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendRoleMain(d)

      const response = await main.updateOne({
        id: args.id,
        name: args.name,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendRole_deleteOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendRoleMain(d)

      const response = await main.deleteOne({
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
    backendRoleManyPermission_addOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendRoleManyPermissionMain(d)

      const response = await main.addOne({
        roleId: args.roleId,
        permissionId: args.permisisonId,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendRoleManyPermission_deleteOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendRoleManyPermissionMain(d)

      const response = await main.deleteOne({
        roleId: args.roleId,
        permissionId: args.permisisonId,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendRoleManyPermission_setList: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendRoleManyPermissionMain(d)

      const response = await main.setList(args.roleManyPermissionArray)

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
  }
};

export default backendRoleGqlResolver