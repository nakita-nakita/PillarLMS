import { FindAndCountOptions, Op } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  q?: string
  page?: number
  pageSize?: number
  userId: string
}

export default function getManyWithPagination(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<findAndCountAll<backendNotification>>> => {
    let { q, page, pageSize, userId } = args
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
      raw: true,
      transaction: d.subDomainTransaction,
      order: [['createdAt', 'DESC']],
    };

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
        ...search,
        where: {
          name: {
            [Op.like]: "%" + q + "%",
          },
        },
      }
    }

    search.where = {
      ...search.where,
      userId,
    }


    let data: any = await db.backendNotification.findAndCountAll(search)
    // .catch(error => d.errorHandler(error, d.loggers))
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


