import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import { meetingType } from "../../../../_singleton/preMain/scripts/meetings/meeting.types";
import makeCollaborateMeeting from "../../../preMain/collaborateMeeting.cache";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string,
}

export default function getOnlineUsersNotInMeeting(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<meetingType[]>> => {

    const { errorHandler, loggers } = d

    const meeting = makeCollaborateMeeting(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "'id' is missing.",
        errorIdentifier: "collaborateMeeting_getOnlineUsersNotInMeeting_error:0001"
      })
    }

    const isIdUuid = stringHelpers.isStringValidUuid({
        str: args.id
      })
  
      if (!isIdUuid.result) {
        return endMainFromError({
          hint: "Datapoint 'id' is not valid UUID.",
          errorIdentifier: "collaborateMeeting_getOnlineUsersNotInMeeting_error0002"
        })
      }

    //////////////////////////////////////
    // Business Logic
    // ===================================    

    const response = await meeting.getOnlineUsersNotInMeeting({
      id: args.id,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}