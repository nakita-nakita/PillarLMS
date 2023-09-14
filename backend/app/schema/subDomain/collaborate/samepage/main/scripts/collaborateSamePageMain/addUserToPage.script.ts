import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import { Model } from "sequelize";
import makeCollaborateSamePageCache from "../../../preMain/collaborateSamePage.cache";
import { SamePageObject } from "../../../preMain/scripts/collaborateSamePageCache/getAllUsersFromPage.script";

type input = {
    userId: string,
    url: string,
    testmode?: boolean
}

export default function addUserToPage(d: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<SamePageObject>> => {

    const { errorHandler, loggers } = d
 
    const samePage = makeCollaborateSamePageCache(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "'userId' is missing.",
        errorIdentifier: "collaborateSamePage_addUserToPage_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.userId,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'userId' is not a UUID.",
        errorIdentifier: "collaborateSamePage_addUserToPage_error:0002"
      })
    }

    if (!args.url) {
        return endMainFromError({
          hint: "'url' is missing.",
          errorIdentifier: "collaborateSamePage_addUserToPage_error:0003"
        })
      }
  
    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await samePage.addUserToPage({
      userId: args.userId,
      url: args.url,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}