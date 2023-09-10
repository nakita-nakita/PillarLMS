import { FindAndCountOptions, Op } from "sequelize";
import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";

type input = {
  q?: string
  page?: number
  pageSize?: number
  roleId?: string
  userId?: string
}

export default function getManyWithPagination({ domainDb, errorHandler, transaction, loggers, }: d_domain) {

  const db = domainDb.models;

  return async (args: input): Promise<returningSuccessObj<findAndCountAll<foundationUser>>> => {
    let { q, page, pageSize, userId, roleId } = args
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
      transaction,
    };

    if (q) {
      search = {
        ...search,
        where: {
          email: {
            [Op.like]: "%" + q + "%",
          },
        },
      }
    }

    let data: findAndCountAll<foundationUser> = await db.foundationUser.findAndCountAll(search).catch(error => errorHandler(error, loggers))
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


