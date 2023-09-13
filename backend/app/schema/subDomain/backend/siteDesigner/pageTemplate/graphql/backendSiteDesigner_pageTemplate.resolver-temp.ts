import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendSiteDesignerPageTemplateMain from "../main/backendSiteDesigner_pageTemplate.main";



// const main = makeMain(subDomainDb);

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
makeBackendSiteDesignerPageTemplateMain
const permissionResolver = {
  Query: {
    backendSiteDesigner_pageTemplate_getOneById: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeBackendSiteDesignerPageTemplateMain(d)

      const response = await main.getOneById({
        id: args.id
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.dataValues

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesigner_pageTemplate_getManyWithPagination: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeBackendSiteDesignerPageTemplateMain(d)

      const response = await main.getManyWithPagination({
        q: args.q,
        page: args.page,
        pageSize: args.pageSize,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data.rows.map(result => ({
          ...result,
          dataJSON: JSON.stringify(result.dataValues.data)
        }))

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    }
  },
  Mutation: {
    backendSiteDesigner_pageTemplate_addOne: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeBackendSiteDesignerPageTemplateMain(d)

      const response = await main.addOne({
        data: args.dataJSON ? JSON.parse(args.dataJSON) : undefined,
        nickname: args.nickname,
        version: args.version,
        isReady: args.isReady,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesigner_pageTemplate_updateOne: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeBackendSiteDesignerPageTemplateMain(d)

      const response = await main.updateOne({
        id: args.id,
        data: args.data,
        nickname: args.nickname,
        version: args.version,
        isReady: args.isReady,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    backendSiteDesigner_pageTemplate_deleteOne: async (parent, args, ctx) => {
      const d = await makeDObj()
      const main = makeBackendSiteDesignerPageTemplateMain(d)

      const response = await main.deleteOne({
        id: args.id,
      })

      if (response?.success) {
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    }
  },
};

export default permissionResolver;