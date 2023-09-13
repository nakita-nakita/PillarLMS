import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid"
import { Sequelize } from "sequelize-typescript";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import emptyTestDomainDb from "../../../../../../../../models/domain/_test/emptyTestDb";
import emptyTestSubdomainDb from "../../../../../../../../models/subDomain/_test/emptyTestDb";
import backendUser from "../../../../../../../../models/subDomain/backend/user/backendUser.model";
import { d_allDomain } from "../../../../../../../utils/types/dependencyInjection.types";
import makeBackendUserSql from "../../../../../user/preMain/backendUser.sql";
import makeBackendSiteDesignerSettingUpdateAccessMain from "../../backendSiteDesignerSetting_updateAccess.main";
jest.setTimeout(100000)

describe("test backendSiteDesignerSetting_updateAccess.sql.js", () => {
  let d: d_allDomain;

  let user1: Model<backendUser>
  let user2: Model<backendUser>
  let user3: Model<backendUser>
  let user4: Model<backendUser>
  let user5: Model<backendUser>

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
        // throwIt,
      ]
    };


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
    const updateAccessMain = makeBackendSiteDesignerSettingUpdateAccessMain(d)

    const setList = await updateAccessMain.setList([
      {
        userId: user1.dataValues.id,
      },
    ])


    expect(setList.success).toBe(true)
  })

  test("setList & getAll: can update and get record.", async () => {
    const updateAccessMain = makeBackendSiteDesignerSettingUpdateAccessMain(d)

    const getAll = await updateAccessMain.getAll()
    expect(getAll.data.length).toBe(1)
    expect(getAll.data[0].dataValues.userId).toEqual(user1.dataValues.id)


    const setList = await updateAccessMain.setList([
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


    const getAll2 = await updateAccessMain.getAll()
    expect(getAll2.data.length).toBe(4)
    expect(getAll2.data.map(d => d.dataValues.userId)).not.toContain(user1.dataValues.id)


    // delete user two
    const newList = getAll2.data
    .filter(d => d.dataValues.userId !== user2.dataValues.id)
    .map(d => ({
      id: d.dataValues.id,
      userId: d.dataValues.userId
    }));

    const setList2 = await updateAccessMain.setList(newList)
    expect(setList2.success).toBe(true)


    const getAll3 = await updateAccessMain.getAll()
    const getAll3Flat = getAll3.data.map(d => d.dataValues.userId)
    expect(getAll3.data.length).toBe(3)
    expect(getAll3Flat).not.toContain(user2.dataValues.id)
    expect(getAll3Flat).toContain(user3.dataValues.id)
    expect(getAll3Flat).toContain(user4.dataValues.id)
    expect(getAll3Flat).toContain(user5.dataValues.id)
    // expect(getOne.data.dataValues.canAllUpdate).toBe(true)
  })

  test("setList: bad data: userId is not a Uuid", async () => {
    const updateAccessMain = makeBackendSiteDesignerSettingUpdateAccessMain(d)

    const setList = await updateAccessMain.setList([
      {
        userId: "I am a uuid",
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

    expect(setList.success).toBe(false)
  })

  test("setList: bad data: userId is not a Uuid", async () => {
    const updateAccessMain = makeBackendSiteDesignerSettingUpdateAccessMain(d)

    const setList = await updateAccessMain.setList([
      {
        id: "I am a uuid",
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

    expect(setList.success).toBe(false)
  })

  test("setList: bad data: id not an existing Uuid", async () => {
    const updateAccessMain = makeBackendSiteDesignerSettingUpdateAccessMain(d)

    const setList = await updateAccessMain.setList([
      {
        id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
        userId: user1.dataValues.id,
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

    expect(setList.success).toBe(false)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
    await d.subDomainTransaction.rollback();
  })
})

