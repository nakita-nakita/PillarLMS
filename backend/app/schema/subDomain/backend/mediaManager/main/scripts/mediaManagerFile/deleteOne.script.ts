import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendMediaManagerFileSql from "../../../preMain/backendMediaManagerFile.sql";

type input = {
  id: string
  deletedBy: string
}

export default function deleteOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<number>> => {

    const fileSql = makeBackendMediaManagerFileSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendMediaManagerFile_deleteOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendMediaManagerFile_deleteOne_error:0001"
      })
    }


    if (!args.deletedBy) {
      return endMainFromError({
        hint: "Datapoint 'deletedBy' is not UUID format.",
        errorIdentifier: "backendMediaManagerFile_deleteOne_error:0002"
      })
    }

    const isDeletedByUuid = stringHelpers.isStringValidUuid({
      str: args.deletedBy
    })

    if (!isDeletedByUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'deletedBy' is not UUID format.",
        errorIdentifier: "backendMediaManagerFile_deleteOne_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await fileSql.deleteOne({
      id: args.id,
      deletedBy: args.deletedBy
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}