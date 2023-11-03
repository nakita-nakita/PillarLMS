import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendNotificationMain from "../../../backend/notification/main/backendNotification.main";
import { notificationIconEnum, notificationTypeEnum } from "../../../backend/notification/preMain/scripts/sql/addOne.script";
import makeMeeting from "../../_singleton/preMain/meetings.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-meeting-invite-user', async (data) => {
    const domainTransaction = await d.domainDb.transaction()
    const subDomainTransaction = await d.subDomainDb.transaction()

    const notification = makeBackendNotificationMain({
      domainDb: d.domainDb,
      domainTransaction,
      subDomainDb: d.subDomainDb,
      subDomainTransaction,
      errorHandler: d.errorHandler,
      loggers: d.loggers
    })

    const result = await notification.addOne({
      userId: data.userId,
      message: "You have been invited to a meeting.",
      action: {
        type: notificationTypeEnum.MEETING,
        icon: notificationIconEnum.MEETING,
        data: {
          meetingId: data.meetingId,
        }
      }
    })

    if (result.success) {
      domainTransaction.commit()
      subDomainTransaction.commit()
    } else {
      domainTransaction.rollback()
      subDomainTransaction.rollback()
    }
  });
}