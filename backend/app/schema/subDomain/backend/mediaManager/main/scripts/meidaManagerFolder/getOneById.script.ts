import { Model } from "sequelize";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendMediaManagerFolderSql from "../../../preMain/backendMediaManagerFolder.sql";
import backendMediaManagerFolder from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFolder.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function getOneById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendMediaManagerFolder> | null>> => {

    const folderSql = makeBackendMediaManagerFolderSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendMediaManagerFolder_getOneById_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendMediaManagerFolder_getOneById_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await folderSql.getOneById({
      id: args.id,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}