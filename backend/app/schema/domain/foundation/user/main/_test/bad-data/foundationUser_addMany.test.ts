import { Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import makeFoundationUserMain from "../../foundationUser.main";
jest.setTimeout(100000)


describe("test backendSiteDesigner_pageTemplate.main.js with bad data.", () => {
  let d: d_domain

  beforeAll(async () => {
    const domainDb: Sequelize = await emptyTestDomainDb();
    const domainTransaction = await domainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      domainDb,
      domainTransaction,
      loggers: [
        console,
        throwIt,
      ]
    };
  }, 100000)

  test("foundationUser_addMany_error0001: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addMany = await foundationUserMain.addMany(null)

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0001")
  })

  test("foundationUser_addMany_error0002: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addMany = await foundationUserMain.addMany(new Array(51).map(a => ({
      email: "asdf@asdf.com",
      password: "ASDFasdf!1",
    })))

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0002")
  })

  test("foundationUser_addMany_error0003: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addMany = await foundationUserMain.addMany([
      {
        email: null,
        password: "",
      }
    ])

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0003")
  })


  test("foundationUser_addMany_error0004: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addMany = await foundationUserMain.addMany([
      {
        email: "This is an email.",
        password: "",
      }
    ])

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0004")
  })


  test("foundationUser_addMany_error0005: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    await foundationUserMain.addMany([
      {
        email: "asdftestfoundationUserbaderror3@asdf.com",
        password: "ASDFasdf1!",
      }
    ])

    const addMany = await foundationUserMain.addMany([
      {
        email: "asdftestfoundationUserbaderror3@asdf.com",
        password: "",
      }
    ])
    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0005")
  })

  test("foundationUser_addMany_error0006: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addMany = await foundationUserMain.addMany([
      {
        email: "foundationUser_addMany_error0004@email.com",
        password: null,
      }
    ])

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0006")
  })

  test("foundationUser_addMany_error0007: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addMany = await foundationUserMain.addMany([
      {
        email: "foundationUser_addMany_error0004@email.com",
        password: "abc",
      }
    ])

    expect(addMany.success).toBe(false)
    expect(addMany.errorIdentifier).toEqual("foundationUser_addMany_error0007")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
  })
})