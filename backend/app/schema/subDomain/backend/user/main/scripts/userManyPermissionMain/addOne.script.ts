import { Model } from "sequelize";
import backendUserManyPermission from "../../../../../../../models/subDomain/backend/user/backendUserManyPermission.model";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendUserValidation from "../../../preMain/backendUser.validation";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendUserManyPermissionSql from "../../../preMain/backendUserManyPermission.sql";
import makeBackendPermissionEntity from "../../../../permission";

type input = {
  userId: string
  permissionId: string
}

export default function addOne(d: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUserManyPermission> | null>> => {

    const userManyPermissionSql = makeBackendUserManyPermissionSql(d)
    const userValidation = makeBackendUserValidation(d)
    const { permissionEntity } = makeBackendPermissionEntity(d)

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
    }).catch(error => d.errorHandler(error, d.loggers))

    if (!isUserIdValid.result) {
      return endMainFromError({
        hint: "'userId' is not valid.",
        errorIdentifier: "backendUser_addOne_error0003"
      })
    }

    if (!args.permissionId) {
      return endMainFromError({
        hint: "'permissionId' is missing.",
        errorIdentifier: "backendUser_addOne_error0004"
      })
    }

    const isPermissionIdUuid = stringHelpers.isStringValidUuid({
      str: args.permissionId,
    })

    if (!isPermissionIdUuid.result) {
      return endMainFromError({
        hint: "'permissionId' is not a UUID.",
        errorIdentifier: "backendUser_addOne_error0005"
      })
    }

    // const isPermissionIdValid = await permissionEntity.isIdValid({
    //   id: args.userId
    // }).catch(error => errorHandler(error, d.loggers))

    // if (!isPermissionIdValid.result) {
    //   return endMainFromError({
    //     hint: "'permissionId' is not valid.",
    //     errorIdentifier: "backendUser_addOne_error0006"
    //   })
    // }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userManyPermissionSql.addOne({
      permissionId: args.permissionId,
      userId: args.userId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}