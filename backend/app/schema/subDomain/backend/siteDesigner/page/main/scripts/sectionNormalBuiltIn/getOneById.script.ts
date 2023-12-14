import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPageSectionNormalBuiltInSql from "../../../preMain/backendSiteDesignerPageSectionNormalBuiltIn.sql";
import backendSiteDesignerPageSectionNormalBuiltIn from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionNormalBuiltIn.model";

type input = {
  id?: string
}

// selectionType: SelectionTypeEnum;

export default function getOneById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionNormalBuiltIn> | null>> => {

    const sql = makeBackendSiteDesignerPageSectionNormalBuiltInSql(d);

    const response = sql.getOneById({
      id: args.id,

    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}