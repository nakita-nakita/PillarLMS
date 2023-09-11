import { Sequelize } from "sequelize-typescript";
import emptyTestDomainDb from "../../../../../models/domain/_test/emptyTestDb";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain } from "../../../../utils/types/dependencyInjection.types";
import makeBackendUserMain from "../main/backendUser.main";
import makeBackendUserBasicViewMain from "../main/backendUserBasicView.main";
import makeBackendUserManyPermissionMain from "../main/backendUserManyPermission.main";
import makeBackendUserManyRoleMain from "../main/backendUserManyRole.main";
import makeBackendUserProfileMain from "../main/backendUserProfile.main";



const makeDObj = async (): Promise<d_allDomain> => {
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  const domainDb: Sequelize = await emptyTestDomainDb();
  const subDomaintransaction = await subDomainDb.transaction();
  const domainTransaction = await domainDb.transaction();

  return {
    subDomainDb,
    domainDb,
    subDomaintransaction,
    domainTransaction,
    loggers: [console],
    errorHandler: sequelizeErrorHandler,
  }
}


const userResolver = {
  Query: {
    backendUser_getOneById: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserMain(d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data.dataValues

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendUser_getManyWithPagination: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserMain(d)

      const response = await main.getManyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendUserBasicView_me: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserBasicViewMain(d)

      const response = await main.me({
        id: ctx.user.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendUserBasicView_them: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserBasicViewMain(d)

      const response = await main.them({
        id: args.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendUserManyPermission_getAll: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserManyPermissionMain(d)

      const response = await main.getAll({
        id: args.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendUserManyRole_getAll: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserManyRoleMain(d)

      const response = await main.getAll({
        id: args.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendUserProfile_getOneById: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserProfileMain(d)

      const response = await main.getOneById({
        id: args.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data.dataValues

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    }
  },
  Mutation: {
    backendRole_addOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserMain(d)

      const response = await main.addOne({
        email: args.email,
        password: args.password,
        username: args.username,
        isAdmin: args.isAdmin,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },

    backendRole_updateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserMain(d)

      const response = await main.updateOne({
        id: args.id,
        email: args.email,
        password: args.password,
        username: args.username,
        isAdmin: args.isAdmin,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data.dataValues

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendRole_deleteOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserMain(d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data.dataValues

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendUserManyPermission_setList: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserManyPermissionMain(d)

      const response = await main.setList(args.list)

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendUserManyRole_setList: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserManyRoleMain(d)

      const response = await main.setList(args.list)

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendUserProfile_deactivateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserProfileMain(d)

      const response = await main.deactivateOne({
        id: args.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendUserProfile_reactivateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserProfileMain(d)

      const response = await main.reactivateOne({
        id: args.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
    backendUserProfile_updateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendUserProfileMain(d)

      const response = await main.updateOne({
        id: args.id,
        // birthday: args.birthday,
        // location: args.location,
        // picture: args.picture,
        // username: args.username,
        // website: args.website,
        callByType: args.callByType,
        circleColor: args.circleColor,
        firstName: args.firstName,
        labelColor: args.labelColor,
        lastName: args.lastName,
        picture: args.picture,
        username: args.username,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomaintransaction.commit()
        return response.data.dataValues

      } else {
        d.transaction.rollback()
        return graphqlError(response)
      }
    },
  }
};

export default userResolver;