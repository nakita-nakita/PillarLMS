import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_allDomain, d_domain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import { Model } from "sequelize";
// import makeFoundationUserSql from "../../../../../../domain/foundation/user/preMain/foundationUser.sql";
import makeBackendUserSql from "../../../preMain/backendUser.sql"
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";

type input = {
  id: string
}

export default function getOneById({ domainDb, subDomainDb, domainTransaction, subDomaintransaction, errorHandler, loggers }: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUser>>> => {

    const userSql = makeBackendUserSql({ domainDb, subDomainDb, domainTransaction, subDomaintransaction, errorHandler, loggers })

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "'id' is missing.",
        errorIdentifier: "backendUserAccount_updateOne_error0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.id,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'id' is not a UUID.",
        errorIdentifier: "backendUserAccount_updateOne_error0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userSql.getOneById({
      id: args.id
    })
    // .catch(error => errorHandler(error, loggers))

    return response
  }
}