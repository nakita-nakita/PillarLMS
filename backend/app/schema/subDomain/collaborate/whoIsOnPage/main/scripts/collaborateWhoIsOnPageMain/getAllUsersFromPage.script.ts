import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeCollaborateSamePageCache from "../../../preMain/collaborateWhoIsOnPage.cache";
import { SamePageObject } from "../../../preMain/scripts/collaborateWhoIsOnPageCache/getAllUsersFromPage.script";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  url: string,
}

export default function getAllUsersFromPage(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<SamePageObject>> => {

    const { errorHandler, loggers } = d

    const samePage = makeCollaborateSamePageCache(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.url) {
      return endMainFromError({
        hint: "'url' is missing.",
        errorIdentifier: "collaborateSamePage_getAllUsersFromPage_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await samePage.getAllUsersFromPage({
      url: args.url,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}