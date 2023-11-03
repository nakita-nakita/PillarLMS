import makeBackendSettingColors from "../backendSettingColors.sql"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)


describe("test backendSettingColors.sql.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("upsertOne: can edit record.", async () => {
    const settingColors = makeBackendSettingColors(d)

    const updateOne = await settingColors.upsertOne({
      color1: "color1",
      color1Dark1: "color1Dark1",
      color1Dark2: "color1Dark2",
      color1Dark3: "color1Dark3",
      color1Dark4: "color1Dark4",
      color1Light1: "color1Light1",
      color1Light2: "color1Light2",
      color1Light3: "color1Light3",
      color1Light4: "color1Light4",
      color2: "color2",
      color2Dark1: "color2Dark1",
      color2Dark2: "color2Dark2",
      color2Dark3: "color2Dark3",
      color2Dark4: "color2Dark4",
      color2Light1: "color2Light1",
      color2Light2: "color2Light2",
      color2Light3: "color2Light3",
      color2Light4: "color2Light4",
      color3: "color3",
      color3Dark1: "color3Dark1",
      color3Dark2: "color3Dark2",
      color3Dark3: "color3Dark3",
      color3Dark4: "color3Dark4",
      color3Light1: "color3Light1",
      color3Light2: "color3Light2",
      color3Light3: "color3Light3",
      color3Light4: "color3Light4",
      color4: "color4",
      color4Dark1: "color4Dark1",
      color4Dark2: "color4Dark2",
      color4Dark3: "color4Dark3",
      color4Dark4: "color4Dark4",
      color4Light1: "color4Light1",
      color4Light2: "color4Light2",
      color4Light3: "color4Light3",
      color4Light4: "color4Light4",
      color5: "color5",
      color5Dark1: "color5Dark1",
      color5Dark2: "color5Dark2",
      color5Dark3: "color5Dark3",
      color5Dark4: "color5Dark4",
      color5Light1: "color5Light1",
      color5Light2: "color5Light2",
      color5Light3: "color5Light3",
      color5Light4: "color5Light4",
      color6: "color6",
      color6Dark1: "color6Dark1",
      color6Dark2: "color6Dark2",
      color6Dark3: "color6Dark3",
      color6Dark4: "color6Dark4",
      color6Light1: "color6Light1",
      color6Light2: "color6Light2",
      color6Light3: "color6Light3",
      color6Light4: "color6Light4",
      color7: "color7",
      color7Dark1: "color7Dark1",
      color7Dark2: "color7Dark2",
      color7Dark3: "color7Dark3",
      color7Dark4: "color7Dark4",
      color7Light1: "color7Light1",
      color7Light2: "color7Light2",
      color7Light3: "color7Light3",
      color7Light4: "color7Light4",
      color8: "color8",
      color8Dark1: "color8Dark1",
      color8Dark2: "color8Dark2",
      color8Dark3: "color8Dark3",
      color8Dark4: "color8Dark4",
      color8Light1: "color8Light1",
      color8Light2: "color8Light2",
      color8Light3: "color8Light3",
      color8Light4: "color8Light4",
      color9: "color9",
      color9Dark1: "color9Dark1",
      color9Dark2: "color9Dark2",
      color9Dark3: "color9Dark3",
      color9Dark4: "color9Dark4",
      color9Light1: "color9Light1",
      color9Light2: "color9Light2",
      color9Light3: "color9Light3",
      color9Light4: "color9Light4",

    })

    expect(updateOne.data.dataValues.color1).toEqual("color1")
    expect(updateOne.data.dataValues.color1Dark1).toEqual("color1Dark1")
    expect(updateOne.data.dataValues.color1Dark2).toEqual("color1Dark2")
    expect(updateOne.data.dataValues.color1Dark3).toEqual("color1Dark3")
    expect(updateOne.data.dataValues.color1Dark4).toEqual("color1Dark4")
    expect(updateOne.data.dataValues.color1Light1).toEqual("color1Light1")
    expect(updateOne.data.dataValues.color1Light2).toEqual("color1Light2")
    expect(updateOne.data.dataValues.color1Light3).toEqual("color1Light3")
    expect(updateOne.data.dataValues.color1Light4).toEqual("color1Light4")
    expect(updateOne.data.dataValues.color2).toEqual("color2")
    expect(updateOne.data.dataValues.color2Dark1).toEqual("color2Dark1")
    expect(updateOne.data.dataValues.color2Dark2).toEqual("color2Dark2")
    expect(updateOne.data.dataValues.color2Dark3).toEqual("color2Dark3")
    expect(updateOne.data.dataValues.color2Dark4).toEqual("color2Dark4")
    expect(updateOne.data.dataValues.color2Light1).toEqual("color2Light1")
    expect(updateOne.data.dataValues.color2Light2).toEqual("color2Light2")
    expect(updateOne.data.dataValues.color2Light3).toEqual("color2Light3")
    expect(updateOne.data.dataValues.color2Light4).toEqual("color2Light4")
    expect(updateOne.data.dataValues.color3).toEqual("color3")
    expect(updateOne.data.dataValues.color3Dark1).toEqual("color3Dark1")
    expect(updateOne.data.dataValues.color3Dark2).toEqual("color3Dark2")
    expect(updateOne.data.dataValues.color3Dark3).toEqual("color3Dark3")
    expect(updateOne.data.dataValues.color3Dark4).toEqual("color3Dark4")
    expect(updateOne.data.dataValues.color3Light1).toEqual("color3Light1")
    expect(updateOne.data.dataValues.color3Light2).toEqual("color3Light2")
    expect(updateOne.data.dataValues.color3Light3).toEqual("color3Light3")
    expect(updateOne.data.dataValues.color3Light4).toEqual("color3Light4")
    expect(updateOne.data.dataValues.color4).toEqual("color4")
    expect(updateOne.data.dataValues.color4Dark1).toEqual("color4Dark1")
    expect(updateOne.data.dataValues.color4Dark2).toEqual("color4Dark2")
    expect(updateOne.data.dataValues.color4Dark3).toEqual("color4Dark3")
    expect(updateOne.data.dataValues.color4Dark4).toEqual("color4Dark4")
    expect(updateOne.data.dataValues.color4Light1).toEqual("color4Light1")
    expect(updateOne.data.dataValues.color4Light2).toEqual("color4Light2")
    expect(updateOne.data.dataValues.color4Light3).toEqual("color4Light3")
    expect(updateOne.data.dataValues.color4Light4).toEqual("color4Light4")
    expect(updateOne.data.dataValues.color5).toEqual("color5")
    expect(updateOne.data.dataValues.color5Dark1).toEqual("color5Dark1")
    expect(updateOne.data.dataValues.color5Dark2).toEqual("color5Dark2")
    expect(updateOne.data.dataValues.color5Dark3).toEqual("color5Dark3")
    expect(updateOne.data.dataValues.color5Dark4).toEqual("color5Dark4")
    expect(updateOne.data.dataValues.color5Light1).toEqual("color5Light1")
    expect(updateOne.data.dataValues.color5Light2).toEqual("color5Light2")
    expect(updateOne.data.dataValues.color5Light3).toEqual("color5Light3")
    expect(updateOne.data.dataValues.color5Light4).toEqual("color5Light4")
    expect(updateOne.data.dataValues.color6).toEqual("color6")
    expect(updateOne.data.dataValues.color6Dark1).toEqual("color6Dark1")
    expect(updateOne.data.dataValues.color6Dark2).toEqual("color6Dark2")
    expect(updateOne.data.dataValues.color6Dark3).toEqual("color6Dark3")
    expect(updateOne.data.dataValues.color6Dark4).toEqual("color6Dark4")
    expect(updateOne.data.dataValues.color6Light1).toEqual("color6Light1")
    expect(updateOne.data.dataValues.color6Light2).toEqual("color6Light2")
    expect(updateOne.data.dataValues.color6Light3).toEqual("color6Light3")
    expect(updateOne.data.dataValues.color6Light4).toEqual("color6Light4")
    expect(updateOne.data.dataValues.color7).toEqual("color7")
    expect(updateOne.data.dataValues.color7Dark1).toEqual("color7Dark1")
    expect(updateOne.data.dataValues.color7Dark2).toEqual("color7Dark2")
    expect(updateOne.data.dataValues.color7Dark3).toEqual("color7Dark3")
    expect(updateOne.data.dataValues.color7Dark4).toEqual("color7Dark4")
    expect(updateOne.data.dataValues.color7Light1).toEqual("color7Light1")
    expect(updateOne.data.dataValues.color7Light2).toEqual("color7Light2")
    expect(updateOne.data.dataValues.color7Light3).toEqual("color7Light3")
    expect(updateOne.data.dataValues.color7Light4).toEqual("color7Light4")
    expect(updateOne.data.dataValues.color8).toEqual("color8")
    expect(updateOne.data.dataValues.color8Dark1).toEqual("color8Dark1")
    expect(updateOne.data.dataValues.color8Dark2).toEqual("color8Dark2")
    expect(updateOne.data.dataValues.color8Dark3).toEqual("color8Dark3")
    expect(updateOne.data.dataValues.color8Dark4).toEqual("color8Dark4")
    expect(updateOne.data.dataValues.color8Light1).toEqual("color8Light1")
    expect(updateOne.data.dataValues.color8Light2).toEqual("color8Light2")
    expect(updateOne.data.dataValues.color8Light3).toEqual("color8Light3")
    expect(updateOne.data.dataValues.color8Light4).toEqual("color8Light4")
    expect(updateOne.data.dataValues.color9).toEqual("color9")
    expect(updateOne.data.dataValues.color9Dark1).toEqual("color9Dark1")
    expect(updateOne.data.dataValues.color9Dark2).toEqual("color9Dark2")
    expect(updateOne.data.dataValues.color9Dark3).toEqual("color9Dark3")
    expect(updateOne.data.dataValues.color9Dark4).toEqual("color9Dark4")
    expect(updateOne.data.dataValues.color9Light1).toEqual("color9Light1")
    expect(updateOne.data.dataValues.color9Light2).toEqual("color9Light2")
    expect(updateOne.data.dataValues.color9Light3).toEqual("color9Light3")
    expect(updateOne.data.dataValues.color9Light4).toEqual("color9Light4")

  })

  test("getOne: can get record.", async () => {
    const settingColors = makeBackendSettingColors(d)

    const getOne = await settingColors.getOne()
    
    expect(getOne.data.dataValues.color1).toEqual("color1")
    expect(getOne.data.dataValues.color1Dark1).toEqual("color1Dark1")
    expect(getOne.data.dataValues.color1Dark2).toEqual("color1Dark2")
    expect(getOne.data.dataValues.color1Dark3).toEqual("color1Dark3")
    expect(getOne.data.dataValues.color1Dark4).toEqual("color1Dark4")
    expect(getOne.data.dataValues.color1Light1).toEqual("color1Light1")
    expect(getOne.data.dataValues.color1Light2).toEqual("color1Light2")
    expect(getOne.data.dataValues.color1Light3).toEqual("color1Light3")
    expect(getOne.data.dataValues.color1Light4).toEqual("color1Light4")
    expect(getOne.data.dataValues.color2).toEqual("color2")
    expect(getOne.data.dataValues.color2Dark1).toEqual("color2Dark1")
    expect(getOne.data.dataValues.color2Dark2).toEqual("color2Dark2")
    expect(getOne.data.dataValues.color2Dark3).toEqual("color2Dark3")
    expect(getOne.data.dataValues.color2Dark4).toEqual("color2Dark4")
    expect(getOne.data.dataValues.color2Light1).toEqual("color2Light1")
    expect(getOne.data.dataValues.color2Light2).toEqual("color2Light2")
    expect(getOne.data.dataValues.color2Light3).toEqual("color2Light3")
    expect(getOne.data.dataValues.color2Light4).toEqual("color2Light4")
    expect(getOne.data.dataValues.color3).toEqual("color3")
    expect(getOne.data.dataValues.color3Dark1).toEqual("color3Dark1")
    expect(getOne.data.dataValues.color3Dark2).toEqual("color3Dark2")
    expect(getOne.data.dataValues.color3Dark3).toEqual("color3Dark3")
    expect(getOne.data.dataValues.color3Dark4).toEqual("color3Dark4")
    expect(getOne.data.dataValues.color3Light1).toEqual("color3Light1")
    expect(getOne.data.dataValues.color3Light2).toEqual("color3Light2")
    expect(getOne.data.dataValues.color3Light3).toEqual("color3Light3")
    expect(getOne.data.dataValues.color3Light4).toEqual("color3Light4")
    expect(getOne.data.dataValues.color4).toEqual("color4")
    expect(getOne.data.dataValues.color4Dark1).toEqual("color4Dark1")
    expect(getOne.data.dataValues.color4Dark2).toEqual("color4Dark2")
    expect(getOne.data.dataValues.color4Dark3).toEqual("color4Dark3")
    expect(getOne.data.dataValues.color4Dark4).toEqual("color4Dark4")
    expect(getOne.data.dataValues.color4Light1).toEqual("color4Light1")
    expect(getOne.data.dataValues.color4Light2).toEqual("color4Light2")
    expect(getOne.data.dataValues.color4Light3).toEqual("color4Light3")
    expect(getOne.data.dataValues.color4Light4).toEqual("color4Light4")
    expect(getOne.data.dataValues.color5).toEqual("color5")
    expect(getOne.data.dataValues.color5Dark1).toEqual("color5Dark1")
    expect(getOne.data.dataValues.color5Dark2).toEqual("color5Dark2")
    expect(getOne.data.dataValues.color5Dark3).toEqual("color5Dark3")
    expect(getOne.data.dataValues.color5Dark4).toEqual("color5Dark4")
    expect(getOne.data.dataValues.color5Light1).toEqual("color5Light1")
    expect(getOne.data.dataValues.color5Light2).toEqual("color5Light2")
    expect(getOne.data.dataValues.color5Light3).toEqual("color5Light3")
    expect(getOne.data.dataValues.color5Light4).toEqual("color5Light4")
    expect(getOne.data.dataValues.color6).toEqual("color6")
    expect(getOne.data.dataValues.color6Dark1).toEqual("color6Dark1")
    expect(getOne.data.dataValues.color6Dark2).toEqual("color6Dark2")
    expect(getOne.data.dataValues.color6Dark3).toEqual("color6Dark3")
    expect(getOne.data.dataValues.color6Dark4).toEqual("color6Dark4")
    expect(getOne.data.dataValues.color6Light1).toEqual("color6Light1")
    expect(getOne.data.dataValues.color6Light2).toEqual("color6Light2")
    expect(getOne.data.dataValues.color6Light3).toEqual("color6Light3")
    expect(getOne.data.dataValues.color6Light4).toEqual("color6Light4")
    expect(getOne.data.dataValues.color7).toEqual("color7")
    expect(getOne.data.dataValues.color7Dark1).toEqual("color7Dark1")
    expect(getOne.data.dataValues.color7Dark2).toEqual("color7Dark2")
    expect(getOne.data.dataValues.color7Dark3).toEqual("color7Dark3")
    expect(getOne.data.dataValues.color7Dark4).toEqual("color7Dark4")
    expect(getOne.data.dataValues.color7Light1).toEqual("color7Light1")
    expect(getOne.data.dataValues.color7Light2).toEqual("color7Light2")
    expect(getOne.data.dataValues.color7Light3).toEqual("color7Light3")
    expect(getOne.data.dataValues.color7Light4).toEqual("color7Light4")
    expect(getOne.data.dataValues.color8).toEqual("color8")
    expect(getOne.data.dataValues.color8Dark1).toEqual("color8Dark1")
    expect(getOne.data.dataValues.color8Dark2).toEqual("color8Dark2")
    expect(getOne.data.dataValues.color8Dark3).toEqual("color8Dark3")
    expect(getOne.data.dataValues.color8Dark4).toEqual("color8Dark4")
    expect(getOne.data.dataValues.color8Light1).toEqual("color8Light1")
    expect(getOne.data.dataValues.color8Light2).toEqual("color8Light2")
    expect(getOne.data.dataValues.color8Light3).toEqual("color8Light3")
    expect(getOne.data.dataValues.color8Light4).toEqual("color8Light4")
    expect(getOne.data.dataValues.color9).toEqual("color9")
    expect(getOne.data.dataValues.color9Dark1).toEqual("color9Dark1")
    expect(getOne.data.dataValues.color9Dark2).toEqual("color9Dark2")
    expect(getOne.data.dataValues.color9Dark3).toEqual("color9Dark3")
    expect(getOne.data.dataValues.color9Dark4).toEqual("color9Dark4")
    expect(getOne.data.dataValues.color9Light1).toEqual("color9Light1")
    expect(getOne.data.dataValues.color9Light2).toEqual("color9Light2")
    expect(getOne.data.dataValues.color9Light3).toEqual("color9Light3")
    expect(getOne.data.dataValues.color9Light4).toEqual("color9Light4")


  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

