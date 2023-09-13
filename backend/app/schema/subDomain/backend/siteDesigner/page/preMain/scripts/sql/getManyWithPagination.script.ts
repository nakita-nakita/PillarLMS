import { FindAndCountOptions, Op } from "sequelize";
import backendSiteDesigner_page from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesigner_page.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesigner_page>>> => {
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
      transaction: subDomainTransaction,
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


    let data: findAndCountAll<backendSiteDesigner_page> = await db.backendSiteDesigner_page.findAndCountAll(search).catch(error => errorHandler(error, loggers)).catch(error => errorHandler(error, loggers))
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


