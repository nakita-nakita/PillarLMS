import { Model } from "sequelize";
import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model";
import makeFoundationUserSql from "../../../../../../domain/foundation/user/preMain/foundationUser.sql";
import makeFoundationUserValidation from "../../../../../../domain/foundation/user/preMain/foundationUser.validation";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendUserSql from "../../../preMain/backendUser.sql";

type dataResponse = {
  id: string
  email: string
  password: string
  isAdmin: boolean
}

type input = {
  username: string
  email: string
  password: string
  isAdmin: boolean
}

export default function addFirst({ subDomainDb, domainDb, errorHandler, subDomaintransaction, domainTransaction, loggers }: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<dataResponse>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction: subDomaintransaction,
      loggers: [console],
    }

    const d_domain = {
      domainDb,
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction: domainTransaction,
      loggers: [console],
    }

    const foundationUserSql = makeFoundationUserSql(d_domain)
    const foundationUserValidation = makeFoundationUserValidation(d_domain)
    const backendUserSql = makeBackendUserSql({ subDomainDb, domainDb, errorHandler, subDomaintransaction, domainTransaction, loggers })

    //////////////////////////////////////
    // Sql
    // ===================================  

    const isEmailTaken = await foundationUserValidation.isEmailTaken({
      email: args.email,
    })

    let foundationUserResponse: returningSuccessObj<Model<foundationUser>>

    if (!isEmailTaken.result) {
      foundationUserResponse = await foundationUserSql.addOne({
        email: args.email,
        password: args.password,
      })
    } else {
      foundationUserResponse = await foundationUserSql.getOneByEmail({
        email: args.email,
      })
    }

    const backendUserResponse = await backendUserSql.addOne({
      id: foundationUserResponse.data.dataValues.id,
      isAdmin: true,
    })

    return {
      success: true,
      data: {
        id: foundationUserResponse.data.dataValues.id,
        email: foundationUserResponse.data.dataValues.email,
        password: foundationUserResponse.data.dataValues.password,
        isAdmin: backendUserResponse.data.dataValues.isAdmin,
      }
    }

  }
}