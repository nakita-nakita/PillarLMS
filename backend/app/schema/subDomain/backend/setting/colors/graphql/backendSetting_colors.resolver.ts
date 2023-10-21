import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendSettingColorsMain from "../main/backendSettingColors.main";

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

const backendSettingColorsGqlResolver = {
  Query: {
    backendSetting_colors_getOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingColorsMain(d)

      const response = await main.getOne()

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data?.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
  },
  Mutation: {
    backendSetting_colors_updateOne: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeBackendSettingColorsMain(d)

      const response = await main.updateOne({
        color1: args.color1,
        color2: args.color2,
        color3: args.color3,
        color4: args.color4,
        color5: args.color5,
        lightBackgroundColor: args.lightBackgroundColor,
        lightTextColor: args.lightTextColor,
        darkBackgroundColor: args.darkBackgroundColor,
        darkTextColor: args.darkTextColor,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },

  },
}

export default backendSettingColorsGqlResolver
