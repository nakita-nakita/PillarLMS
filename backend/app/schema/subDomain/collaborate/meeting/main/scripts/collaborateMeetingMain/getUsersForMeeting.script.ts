import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import { meetingType } from "../../../../_singleton/preMain/scripts/meetings/meeting.types";
import makeCollaborateMeeting from "../../../preMain/collaborateMeeting.cache";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string,
}

export default function getUsersForMeeting(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<meetingType[]>> => {

    const { errorHandler, loggers } = d

    const meeting = makeCollaborateMeeting(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "'id' is missing.",
        errorIdentifier: "collaborateMeeting_getUsersForMeeting_error:0001"
      })
    }

    const isIdUuid = stringHelpers.isStringValidUuid({
        str: args.id
      })
  
      if (!isIdUuid.result) {
        return endMainFromError({
          hint: "Datapoint 'id' is not valid UUID.",
          errorIdentifier: "collaborateMeeting_getUsersForMeeting_error0002"
        })
      }

    //////////////////////////////////////
    // Business Logic
    // ===================================    

    const response = await meeting.getUsersForMeeting({
      id: args.id,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}