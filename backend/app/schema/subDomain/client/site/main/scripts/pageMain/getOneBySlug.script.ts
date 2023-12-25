import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePage from "../../../../../../../models/subDomain/client/site/clientSitePage.model";
import makeClientSitePageSql from "../../../preMain/clientSitePage.sql";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";

type input = {
  slug: string
}

export default function getOneBySlug(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<clientSitePage> | null>> => {

    const pageSql = makeClientSitePageSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.slug) {
      return endMainFromError({
        hint: "Datapoint 'slug' has no value.",
        errorIdentifier: "clientSitePage_getOneBySlug_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.getOneBySlug({
      slug: args.slug
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
