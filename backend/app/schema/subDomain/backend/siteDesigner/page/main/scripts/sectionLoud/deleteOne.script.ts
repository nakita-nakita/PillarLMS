import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingHeader from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import backendSiteDesignerPageSectionNormal from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionNormal.model";
import makeBackendSiteDesignerPageSectionLoudSql from "../../../preMain/backendSiteDesignerPageSectionLoud.sql";
import backendSiteDesignerPageSectionLoud from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionLoud.model";

type Input = {
  id: string;
};


export default function deleteOne(d: dependencies) {
  return async (args: Input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionLoud> | null>> => {

    const sql = makeBackendSiteDesignerPageSectionLoudSql(d);

    const response = sql.deleteOne({
      id: args.id,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}