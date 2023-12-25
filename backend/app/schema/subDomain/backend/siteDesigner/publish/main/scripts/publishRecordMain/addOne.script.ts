import _ from "lodash";
import { Model } from "sequelize";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPublishRecordSql from "../../../preMain/backendSiteDesignerPublishRecord.sql";
import backendSiteDesignerPublishRecord from "../../../../../../../../models/subDomain/backend/siteDesigner/publish/backendSiteDesignerPublishRecord.model";

type input = { 
  numberOfPages: number
}

export default function addOne(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPublishRecord> | null>> => {

    const pageSql = makeBackendSiteDesignerPublishRecordSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.addOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}