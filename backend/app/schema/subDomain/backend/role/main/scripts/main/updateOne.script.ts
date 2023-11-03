import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendRoleSql from "../../../preMain/backendRole.sql";
import makeBackendRoleValidation from "../../../preMain/backendRole.validation";
import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
  name: string
}

export default function updateOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendRole> | null>> => {

    const backendRoleSql = makeBackendRoleSql(d);
    const backendRoleValidation = makeBackendRoleValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendRole_updateOne_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendRole_updateOne_error0002"
      })
    }

    const isIdValid = await backendRoleValidation.isIdValid({
      id: args.id
    }).catch(error => d.errorHandler(error, d.loggers))

    if (!isIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not a valid UUID.",
        errorIdentifier: "backendRole_updateOne_error0003"
      })
    }

    if (!args.name) {
      return endMainFromError({
        hint: "Datapoint 'name' is missing.",
        errorIdentifier: "backendRole_updateOne_error0004"
      })
    }

    if (args.name.length > 50) {
      return endMainFromError({
        hint: "Datapoint 'name' is too long. 50 character max.",
        errorIdentifier: "backendRole_updateOne_error0005"
      })
    }

    const isNameTaken = await backendRoleValidation.isNameTaken({
      name: args.name
    }).catch(error => d.errorHandler(error, d.loggers))

    if (isNameTaken.result) {
      return endMainFromError({
        hint: "Datapoint 'name' is already taken. Please select a new name.",
        errorIdentifier: "backendRole_updateOne_error0006"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await backendRoleSql.updateOne({
      id: args.id,
      name: args.name,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
