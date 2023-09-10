const db = require("../../../models")
const makeNotificationLogic = require("./notification.logic")

const notificationLogic = makeNotificationLogic(db);


const saveAndSendNotification = async ({
  userId,
  type,
  message,
  locationMessage,
  url
}) => {

  await notificationLogic.addOne({
    type,
    message,
    locationMessage,
    url,
    userId: userId
  })


}

module.exports = {
  saveAndSendNotification
}