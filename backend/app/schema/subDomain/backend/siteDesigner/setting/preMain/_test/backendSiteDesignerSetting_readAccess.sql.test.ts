import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid"
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import makeBackendUserSql from "../../../../user/preMain/backendUser.sql";
import makeBackendSiteDesignerSettingReadAccessSql from "../backendSiteDesignerSetting_readAccess.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSiteDesignerSetting_readAccess.sql.js", () => {
  let d: dependencies;

  let user1: Model<backendUser>
  let user2: Model<backendUser>
  let user3: Model<backendUser>
  let user4: Model<backendUser>
  let user5: Model<backendUser>

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()


    const userSql = makeBackendUserSql(d)

    user1 = (await userSql.addOne({
      id: uuidv4()
    })).data

    user2 = (await userSql.addOne({
      id: uuidv4()
    })).data

    user3 = (await userSql.addOne({
      id: uuidv4()
    })).data

    user4 = (await userSql.addOne({
      id: uuidv4()
    })).data

    user5 = (await userSql.addOne({
      id: uuidv4()
    })).data

  }, 100000)

  test("setList: first time.", async () => {
    const readAccessSql = makeBackendSiteDesignerSettingReadAccessSql(d)

    const setList = await readAccessSql.setList([
      {
        userId: user1.dataValues.id,
      },
    ])


    expect(setList.success).toBe(true)
  })

  test("setList & getAll: can update and get record.", async () => {
    const readAccessSql = makeBackendSiteDesignerSettingReadAccessSql(d)

    const getAll = await readAccessSql.getAll()
    expect(getAll.data.length).toBe(1)
    expect(getAll.data[0].dataValues.userId).toEqual(user1.dataValues.id)


    const setList = await readAccessSql.setList([
      {
        userId: user2.dataValues.id,
      },
      {
        userId: user3.dataValues.id,
      },
      {
        userId: user4.dataValues.id,
      },
      {
        userId: user5.dataValues.id,
      },
    ])

    expect(setList.success).toBe(true)


    const getAll2 = await readAccessSql.getAll()
    expect(getAll2.data.length).toBe(4)
    expect(getAll2.data.map(d => d.dataValues.userId)).not.toContain(user1.dataValues.id)


    // delete user two
    const newList = getAll2.data
    .filter(d => d.dataValues.userId !== user2.dataValues.id)
    .map(d => ({
      id: d.dataValues.id,
      userId: d.dataValues.userId
    }));

    const setList2 = await readAccessSql.setList(newList)
    expect(setList2.success).toBe(true)


    const getAll3 = await readAccessSql.getAll()
    const getAll3Flat = getAll3.data.map(d => d.dataValues.userId)
    expect(getAll3.data.length).toBe(3)
    expect(getAll3Flat).not.toContain(user2.dataValues.id)
    expect(getAll3Flat).toContain(user3.dataValues.id)
    expect(getAll3Flat).toContain(user4.dataValues.id)
    expect(getAll3Flat).toContain(user5.dataValues.id)
    // expect(getOne.data.dataValues.canAllUpdate).toBe(true)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

