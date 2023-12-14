import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionLoudBuiltIn from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionLoudBuiltIn.model";
import makeBackendSiteDesignerPageSectionLoudBuiltInSql from "../../../preMain/backendSiteDesignerPageSectionLoudBuiltIn.sql";

type input = {
  id?: string
}

// selectionType: SelectionTypeEnum;

export default function getOneById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionLoudBuiltIn> | null>> => {

    const sql = makeBackendSiteDesignerPageSectionLoudBuiltInSql(d);

    const response = sql.getOneById({
      id: args.id,

    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}