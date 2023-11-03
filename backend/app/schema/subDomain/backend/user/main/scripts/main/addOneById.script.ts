import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import { Model } from "sequelize";
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import makeBackendUserSql from "../../../preMain/backendUser.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userId: string
  isAdmin?: boolean
}

export default function addOneById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUser>>> => {

    const { errorHandler, loggers } = d

    const userSql = makeBackendUserSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "'userId' is missing.",
        errorIdentifier: "backendUserAccount_addOneById_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.userId,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'userId' is not a UUID.",
        errorIdentifier: "backendUserAccount_addOneById_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userSql.addOne({
      id: args.userId,
      isAdmin: args.isAdmin,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}