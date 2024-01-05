import makeSocketLookUp from "../../../_singleton/preMain/socketLookUp.ram-cache";
import makeCollaborateSameDoc from "../collaborateSameDoc.ram-cache";
import RealTimeYDocAdapter from "../../forUsage/adapters/RealTimeYDocAdapter";
import { RealTimeAdapterPropertyValue } from "../scripts/SameDoc/set.script";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test collaborateSameDoc.ram-cache.js", () => {
  const entity = "backendSettingOrganization"
  let d: dependencies
  let backendSettingOrganizationId;
  const mockEmit1 = jest.fn()
  const mockEmit2 = jest.fn()
  const mockEmit3 = jest.fn()
  const mockEmit4 = jest.fn()
  const mockEmit5 = jest.fn()


  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

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



  }, 100000)


  beforeEach(() => {
    mockEmit1.mockClear();
    mockEmit2.mockClear();
    mockEmit3.mockClear();
    mockEmit4.mockClear();
    mockEmit5.mockClear();
  });

  test("doesEntityExist: no.", async () => {

    const sameDoc = makeCollaborateSameDoc(d)

    const doesEntityExist = await sameDoc.doesEntityExist({
      entity,
    })

    expect(doesEntityExist.result).toBe(false)
    // expect(mockEmit1).toBeCalled()
    // expect(mockEmit1.mock.calls[0][0]).toBe('meeting-user-left');
  })

  test("set.", async () => {

    const sameDoc = makeCollaborateSameDoc(d)

    const prop1 = new RealTimeYDocAdapter({
      initialText: "prop1 text value",
      name: "prop1"
    })
    const prop2 = new RealTimeYDocAdapter({
      initialText: "prop1 text value",
      name: "prop2",
    })
    const properties: RealTimeAdapterPropertyValue[] = [
      {
        name: "prop1",
        adapter: prop1,
      },
      {
        name: "prop2",
        adapter: prop2,
      },
    ]

    const sameDocSet = await sameDoc.set({
      entity,
      properties,
      socketId: "testSocketId1",
    })

    //quick fix with .props, 90% sure
    expect(sameDocSet.data.props.prop1).not.toBe(undefined)
    expect(sameDocSet.data.props.prop2).not.toBe(undefined)
    expect(sameDocSet.data.sockets.length).toBe(1)

    // expect(mockEmit1).toBeCalled()
    // expect(mockEmit1.mock.calls[0][0]).toBe('meeting-user-left');
  })



  test("doesEntityExist: yes.", async () => {

    const sameDoc = makeCollaborateSameDoc(d)

    const doesEntityExist = await sameDoc.doesEntityExist({
      entity,
    })

    expect(doesEntityExist.result).toBe(true)
    // expect(mockEmit1).toBeCalled()
    // expect(mockEmit1.mock.calls[0][0]).toBe('meeting-user-left');
  })

  test("getByEntity.", async () => {

    const sameDoc = makeCollaborateSameDoc(d)

    const sameDocGet = await sameDoc.getByEntity({
      entity,
    })
// quick fixed with props... 90% sure
    expect(sameDocGet.data.props.prop1).not.toBe(undefined)
    expect(sameDocGet.data.props.prop2).not.toBe(undefined)
    expect(sameDocGet.data.sockets.length).toBe(1)
    // expect(mockEmit1).toBeCalled()
    // expect(mockEmit1.mock.calls[0][0]).toBe('meeting-user-left');
  })

  test("getByPropertyName.", async () => {

    const sameDoc = makeCollaborateSameDoc(d)

    const sameDocGet = (await sameDoc.getByPropertyName({
      entity,
      name: "prop1"
    })).data as RealTimeYDocAdapter

    expect(sameDocGet.order).not.toBe(undefined)
    expect(sameDocGet.ydoc).not.toBe(undefined)
    expect(sameDocGet.getAllSelections().length).toBe(0)
    // expect(mockEmit1).toBeCalled()
    // expect(mockEmit1.mock.calls[0][0]).toBe('meeting-user-left');
  })

  //boardcast to users
  test("userConnectsFromEntity && broadcast.", async () => {

    const sameDoc = makeCollaborateSameDoc(d)

    const sameDocRecord = await sameDoc.getByEntity({
      entity,
    })

    await sameDoc.userConnectsToEntity({
      socketId: "testSocketId2",
      entity,
    })
    await sameDoc.userConnectsToEntity({
      socketId: "testSocketId3",
      entity,
    })


    const testSocketChannel = "test-test"
    const testData = "test data"

    await sameDoc.broadcast({
      data: testData,
      entity,
      socketChannel: testSocketChannel,
      socketId: "testSocketId1"
    })


    expect(mockEmit1.mock.calls.length).toBe(0)

    expect(mockEmit2.mock.calls[0]).toEqual([testSocketChannel, testData]);

    expect(mockEmit3.mock.calls[0]).toEqual([testSocketChannel, testData]);
  })

  //self delete entity when users run out.
  // so remove all users and does entity exist should result false

  test("userDisconnectsFromEntity && self deleting entity.", async () => {


    const lookUp = makeSocketLookUp(d)
    const sameDoc = makeCollaborateSameDoc(d)

    const user1 = await lookUp.getLookUpBySocketId({
      socketId: "testSocketId1",
    })
    const user2 = await lookUp.getLookUpBySocketId({
      socketId: "testSocketId2",
    })
    const user3 = await lookUp.getLookUpBySocketId({
      socketId: "testSocketId3",
    })
    const user4 = await lookUp.getLookUpBySocketId({
      socketId: "testSocketId4",
    })
    const user5 = await lookUp.getLookUpBySocketId({
      socketId: "testSocketId5",
    })

    // look up should have entities for the first three but not the last 2
    expect(user1.data.entities[0]).toBe(entity)
    expect(user2.data.entities[0]).toBe(entity)
    expect(user3.data.entities[0]).toBe(entity)
    expect(user4.data.entities.length).toBe(0)
    expect(user5.data.entities.length).toBe(0)

    await sameDoc.userDisconnectsFromEntity({
      socketId: "testSocketId1",
      entity,
    })
    await sameDoc.userDisconnectsFromEntity({
      socketId: "testSocketId2",
      entity,
    })

    await sameDoc.userDisconnectsFromEntity({
      socketId: "testSocketId3",
      entity,
    })

    //look up should have empty arrayies for all entities.
    expect(user1.data.entities.length).toBe(0)
    expect(user2.data.entities.length).toBe(0)
    expect(user3.data.entities.length).toBe(0)
    expect(user4.data.entities.length).toBe(0)
    expect(user5.data.entities.length).toBe(0)


    // feature: because I deleted all of the entity sockets, the entity deleted itself from records allowing for a new entity to be set with a fresh state.
    const doesEntityExist = await sameDoc.doesEntityExist({
      entity,
    })

    expect(doesEntityExist.result).toBe(false)
  })

  // remove user's sockets from all entities, for socket disconnect event.

  test("socketDisconnect_removeFromEntities.", async () => {

    const sameDoc = makeCollaborateSameDoc(d)
    const lookUp = makeSocketLookUp(d)

    const user1 = await lookUp.getLookUpBySocketId({
      socketId: "testSocketId1",
    })
    const user2 = await lookUp.getLookUpBySocketId({
      socketId: "testSocketId2",
    })

    expect(user1.data.entities.length).toBe(0)
    expect(user2.data.entities.length).toBe(0)

    const prop1 = new RealTimeYDocAdapter({
      initialText: "prop1 text value",
      name: "prop1"
    })
    const prop2 = new RealTimeYDocAdapter({
      initialText: "prop1 text value",
      name: "prop2",
    })
    const properties: RealTimeAdapterPropertyValue[] = [
      {
        name: "prop1",
        adapter: prop1,
      },
      {
        name: "prop2",
        adapter: prop2,
      },
    ]

    const sameDocSet = await sameDoc.set({
      entity,
      properties,
      socketId: "testSocketId1",
    })

    expect(user1.data.entities[0]).toEqual(entity)
    expect(user2.data.entities.length).toBe(0)


    await sameDoc.socketDisconnect_removeFromEntities({
      socketId: "testSocketId1",
    })
    //user has been removed.
    const doesEntityExist = await sameDoc.doesEntityExist({
      entity,
    })

    expect(doesEntityExist.result).toBe(false)

  })


  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback();
  })
})
