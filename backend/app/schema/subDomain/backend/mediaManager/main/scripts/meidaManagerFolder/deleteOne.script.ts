import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendMediaManagerFileSql from "../../../preMain/backendMediaManagerFile.sql";
import makeBackendMediaManagerFolderSql from "../../../preMain/backendMediaManagerFolder.sql";

type input = {
  id: string
  deletedBy: string
}

export default function deleteOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<number>> => {

    const folderSql = makeBackendMediaManagerFolderSql(d);
    const fileSql = makeBackendMediaManagerFileSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendMediaManagerFolder_deleteOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendMediaManagerFolder_deleteOne_error:0001"
      })
    }


    if (!args.deletedBy) {
      return endMainFromError({
        hint: "Datapoint 'deletedBy' is not UUID format.",
        errorIdentifier: "backendMediaManagerFolder_deleteOne_error:0002"
      })
    }

    const isDeletedByUuid = stringHelpers.isStringValidUuid({
      str: args.deletedBy
    })

    if (!isDeletedByUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'deletedBy' is not UUID format.",
        errorIdentifier: "backendMediaManagerFolder_deleteOne_error:0002"
      })
    }

    //can not delete if files are in folder.
    const getFiles = await fileSql.getMany({
      folderId: args.id,
    })

    if (getFiles.data.length !== 0) {
      return endMainFromError({
        hint: "Can not delete a folder that has files in it.",
        errorIdentifier: "backendMediaManagerFolder_deleteOne_error:0003"
      })
    }

    //check all children folders for a file to prevent deletion.

    const getAllChildrenFolders = await folderSql.getAllChildFolders({
      id: args.id,
    })

    for (let i = 0; i < getAllChildrenFolders.data.length; i++) {
      const folder = getAllChildrenFolders.data[i];

      const getChildrenFolderFiles = await fileSql.getMany({
        folderId: folder.id,
      })
  
      if (getChildrenFolderFiles.data.length !== 0) {
        return endMainFromError({
          hint: "Can not delete a folder that has files in it.",
          errorIdentifier: "backendMediaManagerFolder_deleteOne_error:0003"
        })
      }
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await folderSql.deleteOne({
      id: args.id,
      deletedBy: args.deletedBy
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}