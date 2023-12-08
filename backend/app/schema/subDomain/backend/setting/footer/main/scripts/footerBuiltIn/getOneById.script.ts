import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSettingFooterBuiltInSql from "../../../preMain/backendSettingFooterBuiltIn.sql";
import backendSettingFooterBuiltIn from "../../../../../../../../models/subDomain/backend/setting/backendSettingFooterBuiltIn.model";

type input = {
  id?: string
}

// selectionType: SelectionTypeEnum;

export default function getOneById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingFooterBuiltIn> | null>> => {

    const sql = makeBackendSettingFooterBuiltInSql(d);

    const response = sql.getOneById({
      id: args.id,

    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}