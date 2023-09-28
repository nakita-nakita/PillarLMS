import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
import makeSocketLookUp from "../socketLookUp.ram-cache";
import { CallByTypeEnum } from "../../../../../domain/foundation/user/preMain/scripts/foundationUserProfileSql/upsertOne.script";
import makeMeeting from "../meetings.ram-cache";
import { meetingType } from "../scripts/meetings/meeting.types";
jest.setTimeout(100000)


describe("test meeeting.main.js", () => {
  let d: d_allDomain
  let currentMeeting: meetingType
  const mockEmit1 = jest.fn()
  const mockEmit2 = jest.fn()
  const mockEmit3 = jest.fn()
  const mockEmit4 = jest.fn()
  const mockEmit5 = jest.fn()
  const mockEmit6 = jest.fn()
  const mockEmit7 = jest.fn()
  const mockEmit8 = jest.fn()
  const mockEmit9 = jest.fn()
  const mockEmit10 = jest.fn()
  const mockEmit11 = jest.fn()
  const mockEmit12 = jest.fn()
  const mockEmit13 = jest.fn()
  const mockEmit14 = jest.fn()
  const mockEmit15 = jest.fn()


  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const domainDb: Sequelize = await emptyTestDomainDb();
    const subDomainTransaction = await subDomainDb.transaction();
    const domainTransaction = await domainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      domainDb,
      subDomainTransaction,
      domainTransaction,
      loggers: [
        console,
        throwIt,
      ]
    };

    const lookUp = makeSocketLookUp(d)

    // 5 users with 3 tabs per user

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit1 },
      email: "test1@test.com",
      socketId: "testSocketId1",
      userId: "testUserId1",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit2 },
      email: "test2@test.com",
      socketId: "testSocketId2",
      userId: "testUserId2",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit3 },
      email: "test3@test.com",
      socketId: "testSocketId3",
      userId: "testUserId3",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit4 },
      email: "test4@test.com",
      socketId: "testSocketId4",
      userId: "testUserId4",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit5 },
      email: "test5@test.com",
      socketId: "testSocketId5",
      userId: "testUserId5",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit6 },
      email: "test1@test.com",
      socketId: "testSocketId6",
      userId: "testUserId1",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit7 },
      email: "test2@test.com",
      socketId: "testSocketId7",
      userId: "testUserId2",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit8 },
      email: "test3@test.com",
      socketId: "testSocketId8",
      userId: "testUserId3",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit9 },
      email: "test4@test.com",
      socketId: "testSocketId9",
      userId: "testUserId4",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit10 },
      email: "test5@test.com",
      socketId: "testSocketId10",
      userId: "testUserId5",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit11 },
      email: "test1@test.com",
      socketId: "testSocketId11",
      userId: "testUserId1",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit12 },
      email: "test2@test.com",
      socketId: "testSocketId12",
      userId: "testUserId2",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit13 },
      email: "test3@test.com",
      socketId: "testSocketId13",
      userId: "testUserId3",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit14 },
      email: "test4@test.com",
      socketId: "testSocketId14",
      userId: "testUserId4",
    })

    await lookUp.set({
      socket: { fakeSocket: true, emit: mockEmit15 },
      email: "test5@test.com",
      socketId: "testSocketId15",
      userId: "testUserId5",
    })


  }, 100000)


  beforeEach(() => {
    mockEmit1.mockClear();
    mockEmit2.mockClear();
    mockEmit3.mockClear();
    mockEmit4.mockClear();
    mockEmit5.mockClear();
    mockEmit6.mockClear();
    mockEmit7.mockClear();
    mockEmit8.mockClear();
    mockEmit9.mockClear();
    mockEmit10.mockClear();
    mockEmit11.mockClear();
    mockEmit12.mockClear();
    mockEmit13.mockClear();
    mockEmit14.mockClear();
    mockEmit15.mockClear();
  });

  test("meeting: start.", async () => {

    const meeting = makeMeeting(d)

    currentMeeting = (await meeting.start({
      name: "test-meeting",
      socketId: "testSocketId1",
      url: "/test/test"
    })).data

    expect(currentMeeting.id).not.toBeNull()
    expect(currentMeeting.name).toEqual("test-meeting")
    expect(currentMeeting.url).toEqual('/test/test')
    expect(currentMeeting.leader.userId).toEqual("testUserId1")
    expect(currentMeeting.sockets.length).toBe(1)
    expect(currentMeeting.sockets[0].userId).toEqual("testUserId1")
  })

  test("meeting: join.", async () => {

    const meeting = makeMeeting(d)

    await meeting.join({
      meetingId: currentMeeting.id,
      socketId: "testSocketId2"
    })

    expect(currentMeeting.id).not.toBeNull()
    expect(currentMeeting.name).toEqual("test-meeting")
    expect(currentMeeting.url).toEqual('/test/test')
    expect(currentMeeting.leader.userId).toEqual("testUserId1")
    expect(currentMeeting.sockets.length).toBe(2)
    expect(currentMeeting.sockets[0].userId).toEqual("testUserId1")
    expect(currentMeeting.sockets[1].userId).toEqual("testUserId2")
    // notifity other sockets of new user.
    expect(mockEmit1).toBeCalled()
    expect(mockEmit1.mock.calls[0][0]).toBe('meeting-user-join');
  })

  test("meeting: join but just a new tab of exisitng user.", async () => {

    const meeting = makeMeeting(d)

    await meeting.join({
      meetingId: currentMeeting.id,
      socketId: "testSocketId7"
    })

    expect(currentMeeting.leader.userId).toEqual("testUserId1")
    expect(currentMeeting.sockets.length).toBe(3)
    // notifity other sockets of new user.
    expect(mockEmit1).not.toBeCalled()
    expect(mockEmit2).not.toBeCalled()
    expect(mockEmit7).not.toBeCalled()
  })

  test("meeting: hangup.", async () => {

    const meeting = makeMeeting(d)
    
    await meeting.hangUp({
      meetingId: currentMeeting.id,
      socketId: "testSocketId2"
    })
    
    // this user should hang up on both of their sockets, so the socket count is now 1
    expect(currentMeeting.sockets.length).toBe(1)
    expect(mockEmit1).toBeCalled()
    expect(mockEmit1.mock.calls[0][0]).toBe('meeting-user-left');
    expect(mockEmit2).toBeCalled()
    expect(mockEmit2.mock.calls[0][0]).toBe('meeting-hang-up');
    expect(mockEmit7).toBeCalled()
    expect(mockEmit7.mock.calls[0][0]).toBe('meeting-hang-up');
  })

  test("meeting: kickUserFromMeeting.", async () => {

    const meeting = makeMeeting(d)

    await meeting.join({
      meetingId: currentMeeting.id,
      socketId: "testSocketId2"
    })

    await meeting.join({
      meetingId: currentMeeting.id,
      socketId: "testSocketId7"
    })

    await meeting.kickUserFromMeeting({
      meetingId: currentMeeting.id,
      socketId: "testSocketId1",
      userId: "testUserId2"
    })


    // user joined with two sockets but gets kicked, both sockets should be removed.
    expect(currentMeeting.sockets.length).toBe(1)
    expect(mockEmit1).toBeCalled()
    // first call is join, call is kick.
    expect(mockEmit1.mock.calls[1][0]).toBe('meeting-info');
    expect(mockEmit2).toBeCalled()
    expect(mockEmit2.mock.calls[0][0]).toBe('meeting-kick');
    expect(mockEmit7).toBeCalled()
    expect(mockEmit7.mock.calls[0][0]).toBe('meeting-kick');
  })
  
  test("getUsersForMeeting.", async () => {

    const meeting = makeMeeting(d)

    await meeting.join({
      meetingId: currentMeeting.id,
      socketId: "testSocketId7"
    })

    await meeting.join({
      meetingId: currentMeeting.id,
      socketId: "testSocketId2"
    })

    const result = await meeting.getUsersForMeeting({
      meetingId: currentMeeting.id
    })

    expect(result.data.length).toBe(2)
    expect(result.data[0].email).toBe("test1@test.com")
    expect(result.data[1].email).toBe("test2@test.com")
  })
  
  test("getOnlineUsersNotInMeeting.", async () => {

    const meeting = makeMeeting(d)


    const result = await meeting.getOnlineUsersNotInMeeting({
      meetingId: currentMeeting.id
    })

    expect(result.data.length).toBe(3)
    expect(result.data[0].email).toBe("test3@test.com")
    expect(result.data[1].email).toBe("test4@test.com")
    expect(result.data[2].email).toBe("test5@test.com")
  })
  
  test("urlChange.", async () => {

    const meeting = makeMeeting(d)


    const result = await meeting.urlChange({
      meetingId: currentMeeting.id,
      socketId: 'testSocketId1',
      url: "/blah/blah"
    })

    expect(currentMeeting.url).toBe('/blah/blah')
    expect(mockEmit1).toBeCalled()
    expect(mockEmit1.mock.calls[0][0]).toBe('meeting-change-url');
    expect(mockEmit2).toBeCalled()
    expect(mockEmit2.mock.calls[0][0]).toBe('meeting-change-url');
    expect(mockEmit7).toBeCalled()
    expect(mockEmit7.mock.calls[0][0]).toBe('meeting-change-url');
  })
  
  test("getMeetingsForUrl.", async () => {

    const meeting = makeMeeting(d)


    const result = await meeting.getMeetingsForUrl({
      url: "/blah/blah",
    })

    expect(result.data.length).toBe(1)
    expect(result.data[0].id).toBe(currentMeeting.id)

    const result2 = await meeting.getMeetingsForUrl({
      url: "/blah/blahasdfasdf",
    })
    expect(result2.data.length).toBe(0)
  })

  test("requestUrlChange.", async () => {

    const meeting = makeMeeting(d)


    const result = await meeting.requestUrlChange({
      meetingId: currentMeeting.id,
      socketId: 'testSocketId7',
      url: "/blah/blah2",
    })

    expect(currentMeeting.url).toBe('/blah/blah')
    expect(mockEmit1).toBeCalled()
    // only send to leader sockets
    expect(mockEmit1.mock.calls[0][0]).toBe('meeting-request-url');
    expect(mockEmit2).not.toBeCalled()
    expect(mockEmit7).not.toBeCalled()
  })

  test("getAllMeetings.", async () => {

    const meeting = makeMeeting(d)

    const result = await meeting.getAllMeetings()

    expect(result.data.length).toBe(1)
  })

  
  test("getMeetingById.", async () => {

    const meeting = makeMeeting(d)

    const result = await meeting.getMeetingById({
      meetingId: currentMeeting.id
    })

    expect(result.data.id).toBe(currentMeeting.id)
  })


  test("changeLeader.", async () => {

    const meeting = makeMeeting(d)

    await meeting.changeLeader({
      socketId: 'testSocketId1',
      meetingId: currentMeeting.id,
      newLeaderUserId: "testUserId2",
      userId: "testUserId1"

    })

    expect(currentMeeting.leader.userId).toBe("testUserId2")
    expect(mockEmit1).toBeCalled()
    expect(mockEmit1.mock.calls[0][0]).toBe('meeting-change-leader');
    expect(mockEmit2).toBeCalled()
    expect(mockEmit2.mock.calls[0][0]).toBe('meeting-change-leader');
    expect(mockEmit7).toBeCalled()
    expect(mockEmit7.mock.calls[0][0]).toBe('meeting-change-leader');
  })

  test("end.", async () => {

    const meeting = makeMeeting(d)

    await meeting.end({
      socketId: 'testSocketId2',
      meetingId: currentMeeting.id,      
    })

    expect(mockEmit1).toBeCalled()
    expect(mockEmit1.mock.calls[0][0]).toBe('meeting-end');
    expect(mockEmit2).toBeCalled()
    expect(mockEmit2.mock.calls[0][0]).toBe('meeting-end');
    expect(mockEmit7).toBeCalled()
    expect(mockEmit7.mock.calls[0][0]).toBe('meeting-end');

    const result = await meeting.getAllMeetings();

    expect(result.data.length).toBe(0)

  })


  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})

