import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendSiteDesignerSettingMain from "../main/backendSiteDesignerSetting.main";
import makeBackendSiteDesignerSettingReadAccessMain from "../main/backendSiteDesignerSetting_readAccess.main";
import makeBackendSiteDesignerSettingSettingAccessMain from "../main/backendSiteDesignerSetting_settingAccess.main";
import makeBackendSiteDesignerSettingUpdateAccessMain from "../main/backendSiteDesignerSetting_updateAccess.main";

const makeDObj = async (): Promise<d_sub> => {
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  const subDomainTransaction = await subDomainDb.transaction();

  return {
    subDomainDb,
    subDomainTransaction,
    loggers: [console],
    errorHandler: sequelizeErrorHandler,
  }
}

const backendSiteSettingGqlResolver = {
  Query: {
    backendSiteDesignerSetting_getOne: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerSettingMain(d)

      const response = await main.getOne()

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerSetting_readAccess_getAll: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerSettingReadAccessMain(d)

      const response = await main.getAll()

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.map(res => res.dataValues)

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerSetting_settingAccess_getAll: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerSettingSettingAccessMain(d)

      const response = await main.getAll()

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.map(res => res.dataValues)

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerSetting_updateAccess_getAll: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerSettingUpdateAccessMain(d)

      const response = await main.getAll()

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.map(res => res.dataValues)

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
  },
  Mutation: {

    backendSiteDesignerSetting_updateOne: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerSettingMain(d)

      const response = await main.updateOne({
        canAllRead: args.canAllRead,
        canAllUpdate: args.canAllUpdate,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerSetting_readAccess_setList: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerSettingReadAccessMain(d)

      const response = await main.setList(args.list)

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerSetting_settingAccess_setList: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerSettingSettingAccessMain(d)

      const response = await main.setList(args.list)

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesignerSetting_updateAccess_setList: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeBackendSiteDesignerSettingUpdateAccessMain(d)

      const response = await main.setList(args.list)

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

export default backendSiteSettingGqlResolver;