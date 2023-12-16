import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionNormal from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionNormal.model";
import makeBackendSiteDesignerPageSectionNormalSql from "../../../preMain/backendSiteDesignerPageSectionNormal.sql";

type Input = {
  id: string;
};

export default function deleteOne(d: dependencies) {
  return async (args: Input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionNormal> | null>> => {

    const sql = makeBackendSiteDesignerPageSectionNormalSql(d);

    const response = sql.deleteOne({
      id: args.id,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}