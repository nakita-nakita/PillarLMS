import makeFoundationUserSql from "../foundationUser.sql"
import makeFoundationUserValidation from "../foundationUser.validation"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";

jest.setTimeout(100000)

describe("test foundationUser.validation.js", () => {
  let d: dependencies

  beforeAll(async () => {
    
    d = await makeDTestObj()

  }, 100000)

  test("doesAUserExists: does a user exists.", async () => {
    const userValidation = makeFoundationUserValidation(d)

    const doesAUserExists = await userValidation.doesAUserExists()

    expect(doesAUserExists.result).toBe(false)

    //seed db for next test
    const userSql = makeFoundationUserSql(d)

    await userSql.addMany([
      {
        // id: uuidv4(),
        email: "awesome.dude@user.com",
        password: "ASDFasdf1!",
      }
    ])
  })

  test("areIdsValid: test real ids", async () => {
    const userSql = makeFoundationUserSql(d)
    const userValidation = makeFoundationUserValidation(d)
    const users = await userSql.getManyWithPagination({})

    const areIdsValid = await userValidation.areIdsValid({
      idArray: users.data.rows.map(p => p.dataValues.id)
    })

    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: test should fail", async () => {
    const userValidation = makeFoundationUserValidation(d)

    const areIdsValid = await userValidation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })

    expect(areIdsValid.result).toBe(false);
  })

  test("doesAUserExists: does a user exists.", async () => {
    const userValidation = makeFoundationUserValidation(d)

    const doesAUserExists = await userValidation.doesAUserExists()

    expect(doesAUserExists.result).toBe(true)
  })

  test("isEmailTaken: does a user exists.", async () => {
    const userValidation = makeFoundationUserValidation(d)

    const isEmailTaken = await userValidation.isEmailTaken({
      email: "awesome.dude@user.com"
    })

    expect(isEmailTaken.result).toBe(true)
  })

  test("isEmailTaken: test name is not taken", async () => {
    const userValidation = makeFoundationUserValidation(d)

    const isEmailTaken = await userValidation.isEmailTaken({
      email: "name.not.taken@user.com"
    })

    expect(isEmailTaken.result).toBe(false);
  })

  // test("isEmailValid: is the email well structured.", async () => {
  //   const userValidation = makeFoundationUserValidation(d)

  //   const isEmailValid = await userValidation.isEmailValid({
  //     email: "awesome.dude@user.com"
  //   })

  //   expect(isEmailValid.result).toBe(true)
  // })

  // test("isEmailValid: test name is not taken", async () => {
  //   const userValidation = makeFoundationUserValidation(d)

  //   const isEmailValid = await userValidation.isEmailValid({
  //     email: "I am an email address."
  //   })

  //   expect(isEmailValid.result).toBe(false);
  // })

  test("isIdValid: test three real ids", async () => {
    const userSql = makeFoundationUserSql(d)
    const userValidation = makeFoundationUserValidation(d)

    const users = await userSql.getManyWithPagination({})
    const realRecord = users.data.rows.filter(p => p.dataValues.email === "awesome.dude@user.com")[0];

    const isIdValid = await userValidation.isIdValid({
      id: realRecord.dataValues.id,
    })

    expect(isIdValid.result).toBe(true);
  })

  test("isIdValid: test should fail", async () => {
    const userValidation = makeFoundationUserValidation(d)

    const isIdValid = await userValidation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  test("isPasswordCorrect: Yes", async () => {
    const userSql = makeFoundationUserSql(d)
    const userValidation = makeFoundationUserValidation(d)

    const getManyWithPagination = await userSql.getManyWithPagination({ q: "awe" })

    const isPasswordCorrect = await userValidation.isPasswordCorrect({
      password: "ASDFasdf1!",
      encryptedPassword: getManyWithPagination.data.rows[0].dataValues.password
    })

    expect(isPasswordCorrect.result).toBe(true)
  })

  test("isPasswordCorrect: No", async () => {
    const userSql = makeFoundationUserSql(d)
    const userValidation = makeFoundationUserValidation(d)

    const getManyWithPagination = await userSql.getManyWithPagination({ q: "awe" })

    const isPasswordCorrect = await userValidation.isPasswordCorrect({
      password: "I am a bad password",
      encryptedPassword: getManyWithPagination.data.rows[0].dataValues.password
    })

    expect(isPasswordCorrect.result).toBe(false)
  })

  test("isPasswordValid: Yes", async () => {
    const userValidation = makeFoundationUserValidation(d)

    const isPasswordValid = await userValidation.isPasswordValid({
      password: "blahblahblah1!ajFE",
    })

    expect(isPasswordValid.result).toBe(true)
  })

  test("isPasswordValid: No", async () => {
    const userValidation = makeFoundationUserValidation(d)

    const isPasswordValid = await userValidation.isPasswordValid({
      password: "1",
    })

    expect(isPasswordValid.result).toBe(false)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback();
  })
})