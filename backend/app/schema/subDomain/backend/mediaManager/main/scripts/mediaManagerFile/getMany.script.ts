import { Model } from "sequelize";
import backendMediaManagerFile from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFile.model";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendMediaManagerFileSql from "../../../preMain/backendMediaManagerFile.sql";

type input = {
  folderId?: string
}

export default function getMany({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
  return async (args?: input): Promise<returningSuccessObj<Model<backendMediaManagerFile>[] | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }

    const fileSql = makeBackendMediaManagerFileSql(d);

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
          errorIdentifier: "backendMediaManagerFile_getMany_error:0001"
        })
      }
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await fileSql.getMany({
      folderId: args.folderId,
    }).catch(error => errorHandler(error, loggers))

    return response;
  }
}
