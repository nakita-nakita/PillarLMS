import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendRoleSql from "../../../preMain/backendRole.sql";
import makeBackendRoleValidation from "../../../preMain/backendRole.validation";
import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  name: string
}

export default function addMany(d: dependencies) {
  return async (roleArray: input[]): Promise<returningSuccessObj<Model<backendRole>[] | null>> => {

    const roleSql = makeBackendRoleSql(d);
    const roleValidation = makeBackendRoleValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!roleArray || roleArray?.length === 0) {
      return endMainFromError({
        hint: "No data was provided.",
        errorIdentifier: "backendRole_addMany_error0001",
      })
    }

    if (roleArray.length > 50) {
      return endMainFromError({
        hint: "Only 50 records max can be processed at once.",
        errorIdentifier: "backendRole_addMany_error0002",
      })
    }

    const names = roleArray.map(p => p.name).filter(name => name)

    if (names.length !== roleArray.length) {
      return endMainFromError({
        hint: "Datapoint 'name' is missing.",
        errorIdentifier: "backendRole_addMany_error0003"
      })
    }

    const namesWithinLength = stringHelpers.areStringsLengthLessThan({
      length: 50,
      strArr: names,
    })

    if (!namesWithinLength.result) {
      return endMainFromError({
        hint: "Datapoint 'name' is too long. 50 character max.",
        errorIdentifier: "backendRole_addMany_error0004"
      })
    }

    const areNamesTaken = await roleValidation.areNamesTaken({
      nameArray: names,
    }).catch(error => d.errorHandler(error, d.loggers))

    if (areNamesTaken.result) {
      return endMainFromError({
        hint: "Datapoint 'name' is already taken. Please select a new name.",
        errorIdentifier: "backendRole_addMany_error0005"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await roleSql.addMany({
      roleNamesArray: roleArray,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
