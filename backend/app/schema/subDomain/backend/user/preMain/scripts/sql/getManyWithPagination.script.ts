import { FindAndCountOptions, Op } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type multiDatabaseUserSearch = {
  id?: string,
  email?: string,
  isAdmin?: boolean,
  username?: string,
  firstName?: string,
  lastName?: string,
  birthday?: string,
  picture?: string,
}

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<findAndCountAll<multiDatabaseUserSearch>>> => {
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
      transaction: d.subDomainTransaction,
    };

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

    const sequelize = require('db_config');

    const qry = `

      SELECT count(*) FROM $subDomain.backendUser;

      SELECT 
        fu.id,
        fu.email,
        bu.isAdmin,
        fup.username,
        fup.firstName,
        fup.lastName,
        fup.birthday,
        fup.picture,
      FROM $subDomain.backendUser as bu
      LEFT $domain.foundationUser as fu
      LEFT $domain.foundationUserProfile as fup

      WHERE 
      $where
      LIMIT $limit
      OFFSET $offset;   
      `;


    let data = await sequelize.query(qry, {
      domain: d.domainDb.getDatabaseName(),
      subDomain: d.subDomainDb.getDatabaseName(),
      where: search.where.toString(),
      limit: search.limit.toString(),
      offset: search.offset.toString(),
    }, { raw: true }).catch(error => d.errorHandler(error, d.loggers))

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


