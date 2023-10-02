import { Model } from "sequelize";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendMediaManagerFileSql from "../../../preMain/backendMediaManagerFile.sql";
import backendMediaManagerFile from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFile.model";
import makeBackendMediaManagerFolderSql from "../../../preMain/backendMediaManagerFolder.sql";
import makeBackendMediaManagerFileValidation from "../../../preMain/backendMediaManagerFile.validation";
import makeBackendMediaManagerFolderValidation from "../../../preMain/backendMediaManagerFolder.validation";

type input = {
  id: string
}

export default function restoreTrashed({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendMediaManagerFile> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const fileSql = makeBackendMediaManagerFileSql(d);
    const folderValidation = makeBackendMediaManagerFolderValidation(d);
    const folderSql = makeBackendMediaManagerFolderSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendMediaManagerFile_restoreTrashed_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendMediaManagerFile_restoreTrashed_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    
    
    const response = await fileSql.restoreTrashed({
      id: args.id,
    }).catch(error => errorHandler(error, loggers))
    
    const file = await fileSql.getOneById({
      id: args.id
    })

    //get breadcrumbs, loop check ID, if id doesn't return a row, restore folder.
    if (file.data.dataValues.folderId) {
      const breadcrumbs = await folderSql.getBreadCrumb({
        id: file.data.dataValues.folderId
      })

      for (let i = 0; i < breadcrumbs.data.length; i++) {
        const crumb = breadcrumbs.data[i];
        
        const checkForRecord = await folderValidation.isIdValid({
          id: crumb.id,
        })

        // if row doesn't exist
        if (!checkForRecord.result) {
          await folderSql.restoreTrashed({
            id: crumb.id,
          })
        }

      }
    }

    return response
  }
}