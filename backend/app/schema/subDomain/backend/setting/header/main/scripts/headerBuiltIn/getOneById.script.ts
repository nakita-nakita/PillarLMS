import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSettingHeaderBuiltInSql from "../../../preMain/backendSettingHeaderBuiltIn.sql";
import backendSettingHeaderBuiltIn from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeaderBuiltIn.model";

type input = {
  id?: string
}

// selectionType: SelectionTypeEnum;

export default function getOneById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingHeaderBuiltIn> | null>> => {

    const sql = makeBackendSettingHeaderBuiltInSql(d);

    const response = sql.getOneById({
      id: args.id,

    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}