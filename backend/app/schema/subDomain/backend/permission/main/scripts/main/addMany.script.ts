import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendPermissionSql from "../../../preMain/backendPermission.sql";
import makeBackendPermissionValidation from "../../../preMain/backendPermission.validation";
import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import stringHelpers from "../../../../../../utils/stringHelpers";

type input = {
  name: string
}

export default function addMany({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {
  return async (permissionArray: input[]): Promise<returningSuccessObj<Model<backendPermission>[] | null>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const permissionSql = makeBackendPermissionSql(d);
    const permissionValidation = makeBackendPermissionValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!permissionArray || permissionArray?.length === 0) {
      return endMainFromError({
        hint: "No data was provided.",
        errorIdentifier: "backendPermission_addMany_error0001",
      })
    }

    if (permissionArray.length > 50) {
      return endMainFromError({
        hint: "Only 50 records max can be processed at once.",
        errorIdentifier: "backendPermission_addMany_error0002",
      })
    }

    const names = permissionArray.map(p => p.name).filter(name => name)

    if (names.length !== permissionArray.length) {
      return endMainFromError({
        hint: "Datapoint 'name' is missing.",
        errorIdentifier: "backendPermission_addMany_error0003"
      })
    }

    const namesWithinLength = stringHelpers.areStringsLengthLessThan({
      length: 50,
      strArr: names,
    })

    if (!namesWithinLength.result) {
      return endMainFromError({
        hint: "Datapoint 'name' is too long. 50 character max.",
        errorIdentifier: "backendPermission_addMany_error0004"
      })
    }

    const areNamesTaken = await permissionValidation.areNamesTaken({
      nameArray: names,
    }).catch(error => errorHandler(error, loggers))

    if (areNamesTaken.result) {
      return endMainFromError({
        hint: "Datapoint 'name' is already taken. Please select a new name.",
        errorIdentifier: "backendPermission_addMany_error0005"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await permissionSql.addMany({
      permissionNamesArray: permissionArray,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}
