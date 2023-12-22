import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeClientSiteLinkSql from "../clientSiteLink.sql"

jest.setTimeout(100000)


describe("test clientSiteLink.sql.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const settingLink = makeClientSiteLinkSql(d)

    const updateOne = await settingLink.upsertOne({
      description: "description",
      image: "image",
      title: "title",

    })

    expect(updateOne.data.dataValues.description).toEqual("description")
    expect(updateOne.data.dataValues.image).toEqual("image")
    expect(updateOne.data.dataValues.title).toEqual("title")

  })

  test("getOne: can get record.", async () => {
    const settingLink = makeClientSiteLinkSql(d)

    const getOne = await settingLink.getOne()

    expect(getOne.data.dataValues.description).toEqual("description")
    expect(getOne.data.dataValues.image).toEqual("image")
    expect(getOne.data.dataValues.title).toEqual("title")
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

