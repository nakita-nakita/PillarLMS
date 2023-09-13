import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid"
import { Sequelize } from "sequelize-typescript";
import backendUser from "../../../../../../../../models/subDomain/backend/user/backendUser.model";
import { d_allDomain, d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import emptyTestSubdomainDb from "../../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import makeBackendUserSql from "../../../../../user/preMain/backendUser.sql";
import emptyTestDomainDb from "../../../../../../../../models/domain/_test/emptyTestDb";
import makeBackendSiteDesignerSettingSettingAccessMain from "../../backendSiteDesignerSetting_settingAccess.main";
jest.setTimeout(100000)

describe("test backendSiteDesignerSetting_settingAccess.sql.js", () => {
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
      domainDb,
      domainTransaction,
      subDomainDb,
      subDomainTransaction,
      errorHandler: sequelizeErrorHandler,
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
    const settingAccessMain = makeBackendSiteDesignerSettingSettingAccessMain(d)

    const setList = await settingAccessMain.setList([
      {
        userId: user1.dataValues.id,
      },
    ])


    expect(setList.success).toBe(true)
  })

  test("setList & getAll: can update and get record.", async () => {
    const settingAccessMain = makeBackendSiteDesignerSettingSettingAccessMain(d)

    const getAll = await settingAccessMain.getAll()
    expect(getAll.data.length).toBe(1)
    expect(getAll.data[0].dataValues.userId).toEqual(user1.dataValues.id)


    const setList = await settingAccessMain.setList([
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


    const getAll2 = await settingAccessMain.getAll()
    expect(getAll2.data.length).toBe(4)
    expect(getAll2.data.map(da => da.dataValues.userId)).not.toContain(user1.dataValues.id)


    // delete user two
    const newList = getAll2.data
    .filter(da => da.dataValues.userId !== user2.dataValues.id)
    .map(da => ({
      id: da.dataValues.id,
      userId: da.dataValues.userId
    }));

    const setList2 = await settingAccessMain.setList(newList)
    expect(setList2.success).toBe(true)


    const getAll3 = await settingAccessMain.getAll()
    const getAll3Flat = getAll3.data.map(da => da.dataValues.userId)
    expect(getAll3.data.length).toBe(3)
    expect(getAll3Flat).not.toContain(user2.dataValues.id)
    expect(getAll3Flat).toContain(user3.dataValues.id)
    expect(getAll3Flat).toContain(user4.dataValues.id)
    expect(getAll3Flat).toContain(user5.dataValues.id)
    // expect(getOne.data.dataValues.canAllUpdate).toBe(true)
  })

  test("setList: bad data: userId is not a Uuid", async () => {
    const settingAccessMain = makeBackendSiteDesignerSettingSettingAccessMain(d)

    const setList = await settingAccessMain.setList([
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
    const settingAccessMain = makeBackendSiteDesignerSettingSettingAccessMain(d)

    const setList = await settingAccessMain.setList([
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
    const settingAccessMain = makeBackendSiteDesignerSettingSettingAccessMain(d)

    const setList = await settingAccessMain.setList([
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

