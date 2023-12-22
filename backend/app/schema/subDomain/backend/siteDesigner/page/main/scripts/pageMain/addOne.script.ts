import _ from "lodash";
import { Model } from "sequelize";
import backendSiteDesignerPage from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPage.model";
import endMainFromError from "../../../../../../../utils/graphql/endMainFromError.func";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendSiteDesignerPage.sql";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { 
  id?: string
  slug: string
  isReady?: boolean
}

export default function addOne(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPage> | null>> => {

    const pageSql = makeBackendSiteDesignerPageSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.slug) {
      return endMainFromError({
        hint: "Datapoint 'slug' not provided.",
        errorIdentifier: "backendSiteDesignerPage_addOne_error:0001"
      })
    }

    if (args.slug.length === 0) {
      return endMainFromError({
        hint: "Datapoint 'slug' not provided.",
        errorIdentifier: "backendSiteDesignerPage_addOne_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.addOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}