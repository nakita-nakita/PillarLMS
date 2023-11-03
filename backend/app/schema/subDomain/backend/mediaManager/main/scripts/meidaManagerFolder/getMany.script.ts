import { Model } from "sequelize";
import backendMediaManagerFolder from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFolder.model";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendMediaManagerFolderSql from "../../../preMain/backendMediaManagerFolder.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  folderId?: string
}

export default function getMany(d: dependencies) {
  return async (args?: input): Promise<returningSuccessObj<Model<backendMediaManagerFolder>[] | null>> => {


    const folderSql = makeBackendMediaManagerFolderSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (args.folderId) {
      const isFolderIdUuid = stringHelpers.isStringValidUuid({
        str: args.folderId
      })

      if (!isFolderIdUuid.result) {
        return endMainFromError({
          hint: "Datapoint 'folderId' is not UUID format.",
          errorIdentifier: "backendMediaManagerFolder_getMany_error:0001"
        })
      }
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await folderSql.getMany({
      folderId: args.folderId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
