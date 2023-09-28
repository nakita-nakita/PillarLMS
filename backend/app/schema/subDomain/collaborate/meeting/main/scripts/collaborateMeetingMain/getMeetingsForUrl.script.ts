import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import { meetingType } from "../../../../_singleton/preMain/scripts/meetings/meeting.types";
import makeCollaborateMeeting from "../../../preMain/collaborateMeeting.cache";

type input = {
  url: string,
}

export default function getMeetingsForUrl(d: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<meetingType[]>> => {

    const { errorHandler, loggers } = d

    const meeting = makeCollaborateMeeting(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.url) {
      return endMainFromError({
        hint: "'url' is missing.",
        errorIdentifier: "collaborateMeeting_getMeetingsForUrl_error:0001"
      })
    }

    //////////////////////////////////////
    // Business Logic
    // ===================================    

    const response = await meeting.getMeetingsForUrl({
      url: args.url,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}