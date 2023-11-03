import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendMediaManagerFileSql from "../../../preMain/backendMediaManagerFile.sql";
import stringHelpers from "../../../../../../utils/stringHelpers";
import backendMediaManagerFile from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFile.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  userFileName: string
  systemFileName: string
  url: string
  folderId?: string,
  uploadedBy: string
}

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendMediaManagerFile> | null>> => {

    const fileSql = makeBackendMediaManagerFileSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userFileName) {
      return endMainFromError({
        hint: "Datapoint 'userFileName' is missing.",
        errorIdentifier: "backendMediaManagerFile_addOne_error:0001"
      })
    }
    if (args.userFileName.length === 0) {
      return endMainFromError({
        hint: "Datapoint 'userFileName' is missing.",
        errorIdentifier: "backendMediaManagerFile_addOne_error:0001"
      })
    }

    if (!args.systemFileName) {
      return endMainFromError({
        hint: "Datapoint 'systemFileName' is missing.",
        errorIdentifier: "backendMediaManagerFile_addOne_error:0002"
      })
    }
    if (args.systemFileName.length === 0) {
      return endMainFromError({
        hint: "Datapoint 'systemFileName' is missing.",
        errorIdentifier: "backendMediaManagerFile_addOne_error:0002"
      })
    }

    if (!args.url) {
      return endMainFromError({
        hint: "Datapoint 'url' is missing.",
        errorIdentifier: "backendMediaManagerFile_addOne_error:0003"
      })
    }
    if (args.url.length === 0) {
      return endMainFromError({
        hint: "Datapoint 'url' is missing.",
        errorIdentifier: "backendMediaManagerFile_addOne_error:0003"
      })
    }


    if (!args.uploadedBy) {
      return endMainFromError({
        hint: "Datapoint 'uploadedBy' is not UUID format.",
        errorIdentifier: "backendMediaManagerFile_addOne_error:0004"
      })
    }

    const isUploadedByUuid = stringHelpers.isStringValidUuid({
      str: args.uploadedBy
    })

    if (!isUploadedByUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'uploadedBy' is not UUID format.",
        errorIdentifier: "backendMediaManagerFile_addOne_error:0004"
      })
    }

    if (args.folderId) {
      const isFolderIdUuid = stringHelpers.isStringValidUuid({
        str: args.folderId
      })

      if (!isFolderIdUuid.result) {
        return endMainFromError({
          hint: "Datapoint 'folderId' is not UUID format.",
          errorIdentifier: "backendMediaManagerFile_addOne_error:0005"
        })
      }
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await fileSql.addOne({
      systemFileName: args.systemFileName,
      uploadedBy: args.uploadedBy,
      url: args.url,
      userFileName: args.userFileName,
      folderId: args.folderId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
