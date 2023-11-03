import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import backendMediaManagerFolder from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFolder.model";
import makeBackendMediaManagerFolderSql from "../../../preMain/backendMediaManagerFolder.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { 
  id: string, 
  name?: string,
  folderId?: string, 
}

export default function updateOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendMediaManagerFolder> | null>> => {

    const folderSql = makeBackendMediaManagerFolderSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendMediaManagerFolder_updateOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendMediaManagerFolder_updateOne_error:0001"
      })
    }


    if (args.folderId) {
      const isFolderIdUuid = stringHelpers.isStringValidUuid({
        str: args.folderId
      })

      if (!isFolderIdUuid.result) {
        return endMainFromError({
          hint: "Datapoint 'folderId' is not UUID format.",
          errorIdentifier: "backendMediaManagerFolder_updateOne_error:0002"
        })
      }
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await folderSql.updateOne({
      id: args.id,
      name: args.name,
      folderId: args.folderId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
