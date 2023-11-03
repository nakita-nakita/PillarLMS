import makeBackendUserSql from "../../../user/preMain/backendUser.sql";
import makeBackendNotificationSql from "../backendNotification.sql";
import { v4 as uuidv4 } from "uuid"
import { notificationIconEnum, notificationTypeEnum } from "../scripts/sql/addOne.script";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
// import makeBackendNotificationSql from "../backendNotification.sql"
jest.setTimeout(100000)


describe("test backendNotification.sql.js", () => {
  let d: dependencies
  let recordId: string
  let userId: string

  beforeAll(async () => {
    
    d = await makeDTestObj()

    const backendUserSql = makeBackendUserSql(d)

    let uuid = uuidv4();

    const user = (await backendUserSql.addOne({
      id: uuid
    })).data


    userId = user.dataValues.id

  }, 100000)

  test("addOne: backendNotification can add record.", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    const addOne = await notificationSql.addOne({
      userId,
      message: "Cool message!",
      action: {
        type: notificationTypeEnum.MEETING,
        icon: notificationIconEnum.MEETING,
        data: {
          meetingId: "1234"
        }
      }
    })
    recordId = addOne.data.dataValues.id
    expect(addOne.data.dataValues.message).toEqual("Cool message!")
  })

  test("getOneById: backendNotification can add record.", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    const getNotification = await notificationSql.getOneById({
      id: recordId,
    })
    expect(getNotification.data.dataValues.message).toEqual("Cool message!")
  })

  test("updateOne: backendNotification can add record.", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    const updateNotification = await notificationSql.updateOne({
      id: recordId,
      message: "Cool message notifications!",
    })
    expect(updateNotification.data.dataValues.message).toEqual("Cool message notifications!")
  })

  
  test("getFirstByCount: backendNotification can add record.", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    await notificationSql.addOne({
      userId,
      message: "Cool message1!",
      action: {
        type: notificationTypeEnum.MEETING,
        icon: notificationIconEnum.MEETING,
        data: {
          meetingId: "1234"
        }
      }
    })
    
    await notificationSql.addOne({
      userId,
      message: "Cool message12",
      action: {
        type: notificationTypeEnum.MEETING,
        icon: notificationIconEnum.MEETING,
        data: {
          meetingId: "1234"
        }
      }
    })
    
    await notificationSql.addOne({
      userId,
      message: "Cool message3!",
      action: {
        type: notificationTypeEnum.MEETING,
        icon: notificationIconEnum.MEETING,
        data: {
          meetingId: "1234"
        }
      }
    })
    
    await notificationSql.addOne({
      userId,
      message: "Cool message4!",
      action: {
        type: notificationTypeEnum.MEETING,
        icon: notificationIconEnum.MEETING,
        data: {
          meetingId: "1234"
        }
      }
    })

    const result = await notificationSql.getFirstByCount({
      userId,
    })

    expect(result.data.length).toBe(3)
  })

  test("getUnseenNotificationCount", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    const hasBeenSeen = await notificationSql.getUnseenNotificationCount({
      userId,
    })

    expect(hasBeenSeen.success).toBe(true)
    expect(hasBeenSeen.data).toBe(5)
  })

  test("hasBeenSeenById", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    const allNotifications = await notificationSql.getManyWithPagination({
      userId,
    })

    const oneSelected: any = allNotifications.data.rows[0]

    const markedAsSeen = await notificationSql.hasBeenSeenById({
      id: oneSelected.id
    })

    const allNotificationsAgain = await notificationSql.getManyWithPagination({
      userId,
    })

    let targetedNotification: any
    for (let i = 0; i < allNotificationsAgain.data.rows.length; i++) {
      const noti: any = allNotificationsAgain.data.rows[i];
      
      if(noti.id === oneSelected.id) {
        targetedNotification = noti
        break;
      }
    }

    expect(targetedNotification.hasBeenSeen).toBe(true)

  })

  test("hasBeenClick", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    const hasBeenClick = await notificationSql.hasBeenClick({
      id: recordId,
    })

    expect(hasBeenClick.success).toBe(true)
    expect(hasBeenClick.data.dataValues.hasBeenClicked).toBe(true)
  })
  

  test("hasBeenSeen", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    const hasBeenSeen = await notificationSql.hasBeenSeen({
      userId,
    })

    expect(hasBeenSeen.success).toBe(true)
    expect(hasBeenSeen.data.length).toBe(5)
  })
  
  test("getUnseenNotificationCount: should be all seen", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    const hasBeenSeen = await notificationSql.getUnseenNotificationCount({
      userId,
    })

    expect(hasBeenSeen.success).toBe(true)
    expect(hasBeenSeen.data).toBe(0)
  })

  test("deleteOne: backendNotification can delete record.", async () => {
    const notificationSql = makeBackendNotificationSql(d)

    const deletedNotification = await notificationSql.deleteOne({
      id: recordId,
    })

    expect(deletedNotification.success).toBe(true)
  })
  // test("doYouHaveNewNotifications", async () => {

  //   const notificationSql = makeBackendNotificationSql(d)

  //   const deletedNotification = await notificationSql.doYouHaveNewNotifications({
  //     userId,
  //     // id: recordId,
  //   })

  //   expect(deletedNotification.success).toBe(true)
  // })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

