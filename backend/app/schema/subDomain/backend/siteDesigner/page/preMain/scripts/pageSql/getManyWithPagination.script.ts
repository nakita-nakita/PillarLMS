import { FindAndCountOptions, Op } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPage from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPage.model";

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesignerPage>>> => {
    if (!args) {
      args = {
        q: undefined,
        page: 1,
        pageSize: undefined,
      }
    }

    let { q, page, pageSize, } = args

    if (args.page && args.page < 0) {
      args.page = 1
    }

    if (args.pageSize && args.pageSize < 0) {
      args.pageSize = 10
    }

    page = page ? page - 1 : 0;
    pageSize = pageSize || 10;


    let search: FindAndCountOptions = {
      offset: page * pageSize,
      limit: pageSize,
      transaction: d.subDomainTransaction,
    };

    if (q) {
      search = {
        ...search,
        where: {
          nickname: {
            [Op.like]: "%" + q + "%",
          },
        },
      }
    }


    let data: findAndCountAll<backendSiteDesignerPage> = await db.backendSiteDesignerPage.findAndCountAll(search).catch(error => d.errorHandler(error, d.loggers)).catch(error => d.errorHandler(error, d.loggers))
    data.page = page + 1;
    data.pageSize = pageSize;
    data.pageCount = Math.ceil(
      data.count / data.pageSize
    );

    return {
      success: true,
      data,
    }
  }
}


