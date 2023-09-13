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

  test("foundationUser_addOne_error0001: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addOne = await foundationUserMain.addOne({
      email: null,
      password: "",
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("foundationUser_addOne_error0001")
  })


  test("foundationUser_addOne_error0002: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addOne = await foundationUserMain.addOne({
      email: "this is an email",
      password: "",
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("foundationUser_addOne_error0002")
  })


  test("foundationUser_addOne_error0003: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    await foundationUserMain.addOne({
      email: "asdftestfoundationUserbaderror3@asdf.com",
      password: "ASDFasdf1!",
    })

    const addOne = await foundationUserMain.addOne({
      email: "asdftestfoundationUserbaderror3@asdf.com",
      password: "",
    })
    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("foundationUser_addOne_error0003")
  })

  test("foundationUser_addOne_error0004: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addOne = await foundationUserMain.addOne({
      email: "foundationUser_addOne_error0004@email.com",
      password: null,
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("foundationUser_addOne_error0004")
  })

  test("foundationUser_addOne_error0005: works", async () => {
    const foundationUserMain = makeFoundationUserMain(d)

    const addOne = await foundationUserMain.addOne({
      email: "foundationUser_addOne_error0004@email.com",
      password: "abc",
    })

    expect(addOne.success).toBe(false)
    expect(addOne.errorIdentifier).toEqual("foundationUser_addOne_error0005")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
  })
})