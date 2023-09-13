import { Model } from "sequelize";
import backendUserManyRole from "../../../../../../../models/subDomain/backend/user/backendUserManyRole.model";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendUserValidation from "../../../preMain/backendUser.validation";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendUserManyRoleSql from "../../../preMain/backendUserManyRole.sql";
import makeBackendRoleEntity from "../../../../role";

type input = {
  userId: string
  roleId: string
}

export default function deleteOne({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<number | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }

    const userManyRoleSql = makeBackendUserManyRoleSql(d)
    const userValidation = makeBackendUserValidation(d)
    const { roleEntity } = makeBackendRoleEntity(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "'userId' is missing.",
        errorIdentifier: "backendUser_addOne_error0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.userId,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'userId' is not a UUID.",
        errorIdentifier: "backendUser_addOne_error0002"
      })
    }

    const isUserIdValid = await userValidation.isIdValid({
      id: args.userId
    }).catch(error => errorHandler(error, loggers))

    if (!isUserIdValid.result) {
      return endMainFromError({
        hint: "'userId' is not valid.",
        errorIdentifier: "backendUser_addOne_error0003"
      })
    }

    if (!args.roleId) {
      return endMainFromError({
        hint: "'roleId' is missing.",
        errorIdentifier: "backendUser_addOne_error0004"
      })
    }

    const isRoleIdUuid = stringHelpers.isStringValidUuid({
      str: args.roleId,
    })

    if (!isRoleIdUuid.result) {
      return endMainFromError({
        hint: "'roleId' is not a UUID.",
        errorIdentifier: "backendUser_addOne_error0005"
      })
    }

    // const isRoleIdValid = await roleEntity.isIdValid({
    //   id: args.userId
    // }).catch(error => errorHandler(error, loggers))

    // if (!isRoleIdValid.result) {
    //   return endMainFromError({
    //     hint: "'roleId' is not valid.",
    //     errorIdentifier: "backendUser_addOne_error0006"
    //   })
    // }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userManyRoleSql.deleteOne({
      roleId: args.roleId,
      userId: args.userId,
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}