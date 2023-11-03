import makeFoundationAuthFunc from "../foundationAuth.func";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendRole.func.js", () => {
  let d: dependencies
  let token: any

  beforeAll(async () => {

    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("signinToken: works.", async () => {
    const authFunc = makeFoundationAuthFunc(d)

    token = await authFunc.signinToken({
      userId: "userId",
    })

    expect(token.success).toEqual(true)
  })

  test("getDataFromToken: backendRoles can add record.", async () => {
    const authFunc = makeFoundationAuthFunc(d)

    const checkedToken = await authFunc.getDataFromToken({
      token: token.data,
    })

    expect(checkedToken.success).toEqual(true)
    expect(checkedToken.data.userId).toEqual("userId")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

