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

export default function addFirst({ subDomainDb, domainDb, errorHandler, subDomainTransaction, domainTransaction, loggers }: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<dataResponse>> => {

    const d: d_allDomain = {
      domainDb,
      domainTransaction,
      subDomainDb,
      subDomainTransaction,
      errorHandler: sequelizeErrorHandler,
      loggers,
    }

    const foundationUserSql = makeFoundationUserSql(d)
    const foundationUserValidation = makeFoundationUserValidation(d)
    const backendUserSql = makeBackendUserSql(d)

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