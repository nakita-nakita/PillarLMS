import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { meetingType } from "../../../../_singleton/preMain/scripts/meetings/meeting.types";
import makeCollaborateMeeting from "../../../preMain/collaborateMeeting.cache";

export default function getAllMeetings(d: dependencies) {
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

    const response = await meeting.getAllMeetings().catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}