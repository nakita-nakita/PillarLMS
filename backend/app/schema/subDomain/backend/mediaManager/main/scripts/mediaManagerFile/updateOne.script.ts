import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import backendMediaManagerFile from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFile.model";
import makeBackendMediaManagerFileSql from "../../../preMain/backendMediaManagerFile.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { 
  id: string, 
  userFileName?: string 
  systemFileName?: string 
  url?: string
  folderId?: string,
}

export default function updateOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendMediaManagerFile> | null>> => {

    const fileSql = makeBackendMediaManagerFileSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendMediaManagerFile_updateOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendMediaManagerFile_updateOne_error:0001"
      })
    }


    if (args.folderId) {
      const isFolderIdUuid = stringHelpers.isStringValidUuid({
        str: args.folderId
      })

      if (!isFolderIdUuid.result) {
        return endMainFromError({
          hint: "Datapoint 'folderId' is not UUID format.",
          errorIdentifier: "backendMediaManagerFile_updateOne_error:0002"
        })
      }
    }
    
    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await fileSql.updateOne({
      id: args.id,
      folderId: args.folderId,
      systemFileName: args.systemFileName,
      url: args.url,
      userFileName: args.userFileName,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
