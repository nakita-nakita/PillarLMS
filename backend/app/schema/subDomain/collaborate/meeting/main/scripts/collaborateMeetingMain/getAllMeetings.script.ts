import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { meetingType } from "../../../../_singleton/preMain/scripts/meetings/meeting.types";
import makeCollaborateMeeting from "../../../preMain/collaborateMeeting.cache";

export default function getAllMeetings(d: d_allDomain) {
  return async (): Promise<returningSuccessObj<meetingType[]>> => {

    const { errorHandler, loggers } = d

    const meeting = makeCollaborateMeeting(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    // none

    //////////////////////////////////////
    // Business Logic
    // ===================================    

    const response = await meeting.getAllMeetings().catch(error => errorHandler(error, loggers))

    return response
  }
}