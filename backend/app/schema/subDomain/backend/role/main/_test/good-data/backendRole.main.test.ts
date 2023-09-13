import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import makeBackendRoleMain from "../../backendRole.main"
jest.setTimeout(100000)


describe("test backendRole.main.js", () => {
  let d: d_sub
  let recordId: string

  beforeAll(async () => {
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const subDomainTransaction = await subDomainDb.transaction();

    d = {
      errorHandler: sequelizeErrorHandler,
      subDomainDb,
      subDomainTransaction,
      loggers: [
        console,
        throwIt,
      ]
    };
  }, 100000)

  test("getManyWithPagination: works.", async () => {
    const roleMain = makeBackendRoleMain(d)

    const roles = await roleMain.getManyWithPagination({})

    expect(roles.success).toEqual(true)
  })

  test("addOne: backendRoles can add record.", async () => {
    const roleMain = makeBackendRoleMain(d)

    const addOne = await roleMain.addOne({
      name: "Cool Role!",
    })
    recordId = addOne.data.dataValues.id
    expect(addOne.data.dataValues.name).toEqual("Cool Role!")
  })

  test("getOneById: backendRoles can add record.", async () => {
    const roleMain = makeBackendRoleMain(d)

    const getRole = await roleMain.getOneById({
      id: recordId,
    })
    expect(getRole.data.dataValues.name).toEqual("Cool Role!")
  })

  test("updateOne: backendRoles can add record.", async () => {
    const roleMain = makeBackendRoleMain(d)

    const updateRole = await roleMain.updateOne({
      id: recordId,
      name: "Cool Role Updated!",
    })
    expect(updateRole.data.dataValues.name).toEqual("Cool Role Updated!")
  })

  test("deleteOne: backendRoles can delete record.", async () => {
    const roleMain = makeBackendRoleMain(d)

    const deletedRole = await roleMain.deleteOne({
      id: recordId,
    })

    expect(deletedRole.success).toBe(true)
  })

  test("addMany: backendRoles can add many records at once.", async () => {
    const roleMain = makeBackendRoleMain(d)

    const addManyRoles = await roleMain.addMany([
      {
        name: "blah1",
      },
      {
        name: "blah2",
      },
      {
        name: "blah3",
      },
    ])
    expect(addManyRoles.data.filter(role => role.dataValues.name === "blah1").length).toBe(1)
    expect(addManyRoles.data.filter(role => role.dataValues.name === "blah2").length).toBe(1)
    expect(addManyRoles.data.filter(role => role.dataValues.name === "blah3").length).toBe(1)
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})

