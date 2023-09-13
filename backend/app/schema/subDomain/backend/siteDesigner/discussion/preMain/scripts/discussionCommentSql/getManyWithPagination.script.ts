import { FindAndCountOptions, Op } from "sequelize";
import { Model } from "sequelize-typescript";
import backendSiteDesigner_discussionComment from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussionComment.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";

type input = {
  q?: string
  page?: number
  pageSize?: number
  // roleId?: string
  // userId?: string
}

export default function getManyWithPagination({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesigner_discussionComment>>> => {
    let { q, page, pageSize, 
      // userId, roleId 
    } = args
    page = page ? page - 1 : 0;
    pageSize = pageSize || 10;

    if (page < 0) {
      return {
        success: false,
        humanMessage: "Please start the page at 1."
      };
    }
    if (pageSize < 0 || pageSize >= 100) {
      return {
        success: false,
        humanMessage: "Please keep pageSize inbetween 1 - 100."
      }
    }

    let search: FindAndCountOptions = {
      offset: page * pageSize,
      limit: pageSize,
      transaction: subDomainTransaction,
    };

    // if (roleId) {
    //   search = {
    //     ...search,
    //     include: {
    //       model: db.roleManyPermission,
    //       where: { roleId, },
    //     }
    //   }
    // }

    // if (userId) {
    //   search = {
    //     ...search,
    //     include: {
    //       model: db.userManyPermission,
    //       where: { userId, },
    //     }
    //   }
    // }

    if (q) {
      search = {
        where: {
          name: {
            [Op.like]: "%" + q + "%",
          },
        },
      }
    }


    let data: findAndCountAll<backendSiteDesigner_discussionComment> = await db.backendSiteDesigner_discussionComment.findAndCountAll(search).catch(error => errorHandler(error, loggers))
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


