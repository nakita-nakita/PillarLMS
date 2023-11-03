import makeBackendRoleSql from "../backendRole.sql"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)


describe("test backendRole.sql.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {
    
    d = await makeDTestObj()
    d.domainTransaction = await d.domainDb.transaction()
    d.subDomainTransaction = await d.subDomainDb.transaction()

  }, 100000)

  test("getManyWithPagination: works.", async () => {
    const roleSql = makeBackendRoleSql(d)

    const roles = await roleSql.getManyWithPagination({})

    expect(roles.success).toEqual(true)
  })

  test("addOne: backendRoles can add record.", async () => {
    const roleSql = makeBackendRoleSql(d)

    const addOne = await roleSql.addOne({
      name: "Cool Role!",
    })
    recordId = addOne.data.dataValues.id
    expect(addOne.data.dataValues.name).toEqual("Cool Role!")
  })

  test("getOneById: backendRoles can add record.", async () => {
    const roleSql = makeBackendRoleSql(d)

    const getRole = await roleSql.getOneById({
      id: recordId,
    })
    expect(getRole.data.dataValues.name).toEqual("Cool Role!")
  })

  test("updateOne: backendRoles can add record.", async () => {
    const roleSql = makeBackendRoleSql(d)

    const updateRole = await roleSql.updateOne({
      id: recordId,
      name: "Cool Role Updated!",
    })
    expect(updateRole.data.dataValues.name).toEqual("Cool Role Updated!")
  })

  test("deleteOne: backendRoles can delete record.", async () => {
    const roleSql = makeBackendRoleSql(d)

    const deletedRole = await roleSql.deleteOne({
      id: recordId,
    })

    expect(deletedRole.success).toBe(true)
  })

  test("addMany: backendRoles can add many records at once.", async () => {
    const roleSql = makeBackendRoleSql(d)

    const addManyRoles = await roleSql.addMany({
      roleNamesArray: [
        {
          name: "blah1",
        },
        {
          name: "blah2",
        },
        {
          name: "blah3",
        },
      ],
    })
    expect(addManyRoles.data.filter(role => role.dataValues.name === "blah1").length).toBe(1)
    expect(addManyRoles.data.filter(role => role.dataValues.name === "blah2").length).toBe(1)
    expect(addManyRoles.data.filter(role => role.dataValues.name === "blah3").length).toBe(1)
  })

  afterAll(async () => {
    await d.domainTransaction.rollback()
    await d.subDomainTransaction.rollback()
  })
})

