import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendRoleSql from "../../../preMain/backendRole.sql";
import makeBackendRoleValidation from "../../../preMain/backendRole.validation";
import backendRole from "../../../../../../../models/subDomain/backend/role/backendRole.model";

type input = {
  name: string
}

export default function addOne({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendRole> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const roleSql = makeBackendRoleSql(d);
    const roleValidation = makeBackendRoleValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.name) {
      return endMainFromError({
        hint: "Datapoint 'name' is missing.",
        errorIdentifier: "backendRole_addOne_error0001"
      })
    }
    
    if (args.name.length > 50) {
      return endMainFromError({
        hint: "Datapoint 'name' is too long. 50 character max.",
        errorIdentifier: "backendRole_addOne_error0002"
      })
    }

    const isNameTaken = await roleValidation.isNameTaken({
      name: args.name
    }).catch(error => errorHandler(error, loggers))

    if (isNameTaken.result) {
      return endMainFromError({
        hint: "Datapoint 'name' is already taken. Please select a new name.",
        errorIdentifier: "backendRole_addOne_error0003"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await roleSql.addOne({
      name: args.name,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}
