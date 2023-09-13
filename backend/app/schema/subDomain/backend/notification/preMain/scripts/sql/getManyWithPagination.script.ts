import { FindAndCountOptions, Op } from "sequelize";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";

type input = {
  q?: string
  page?: number
  pageSize?: number
  userId?: string
}

export default function getManyWithPagination({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (args: input) => {
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
      transaction: subDomainTransaction,
    };

    if (userId) {
      search = {
        ...search,
        include: {
          model: db.userManyPermission,
          where: { userId, },
        }
      }
    }

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


    let data: any = await db.backendNotification.findAndCountAll(search).catch(error => errorHandler(error, loggers))
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


