import { FindAndCountOptions, Op } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import clientUser from "../../../../../../../models/subDomain/client/user/clientUser.model";

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<findAndCountAll<clientUser>>> => {
    let { q, page, pageSize } = args
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

    // search.where = {
    //   ...search.where,
    //   // updates
    // }


    let data: any = await db.clientUser.findAndCountAll(search)
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


