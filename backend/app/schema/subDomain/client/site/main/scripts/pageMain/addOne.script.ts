import _ from "lodash";
import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePage from "../../../../../../../models/subDomain/client/site/clientSitePage.model";
import makeClientSitePageSql from "../../../preMain/clientSitePage.sql";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";

type input = { 
  slug: string
}

export default function addOne(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<clientSitePage> | null>> => {

    const pageSql = makeClientSitePageSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.slug) {
      return endMainFromError({
        hint: "Datapoint 'slug' not provided.",
        errorIdentifier: "clientSitePage_addOne_error:0001"
      })
    }

    if (args.slug.length === 0) {
      return endMainFromError({
        hint: "Datapoint 'slug' not provided.",
        errorIdentifier: "clientSitePage_addOne_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.addOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}