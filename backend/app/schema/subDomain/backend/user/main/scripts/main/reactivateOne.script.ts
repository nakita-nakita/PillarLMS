import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_allDomain, d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import foundationUserProfile from "../../../../../../../models/domain/foundation/user/foundationUserProfile.model";
import { Model } from "sequelize";
import makeFoundationUserSql from "../../../../../../domain/foundation/user/preMain/foundationUser.sql";

type input = {
  id: string
}

export default function reactivateOne({ domainDb, subDomainDb, domainTransaction, subDomaintransaction, errorHandler, loggers }: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<Model<foundationUserProfile>>> => {

    const d = {
      domainDb,
      errorHandler: sequelizeErrorHandler,
      transaction: domainTransaction,
      loggers: [console],
    }

    const userSql = makeFoundationUserSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "'id' is missing.",
        errorIdentifier: "backendUserAccount_deactivateOne_error0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.id,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'id' is not a UUID.",
        errorIdentifier: "backendUserAccount_deactivateOne_error0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userSql.deactivateOne({
      id: args.id
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}