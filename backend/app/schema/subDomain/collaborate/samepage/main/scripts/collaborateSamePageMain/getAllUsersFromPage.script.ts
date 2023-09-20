import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import { Model } from "sequelize";
import makeCollaborateSamePageCache from "../../../preMain/collaborateSamePage.cache";
import { SamePageObject } from "../../../preMain/scripts/collaborateSamePageCache/getAllUsersFromPage.script";

type input = {
  url: string,
}

export default function getAllUsersFromPage(d: d_allDomain) {
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
    })
    
    //.catch(error => errorHandler(error, loggers))

    return response
  }
}