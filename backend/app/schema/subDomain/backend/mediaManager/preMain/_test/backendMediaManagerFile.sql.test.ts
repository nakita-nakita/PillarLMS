import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../utils/errorHandling/loggers/throwIt.logger";
import { d_allDomain } from "../../../../../utils/types/dependencyInjection.types";
import makeBackendMediaManagerFileSql from "../backendMediaManagerFile.sql";
import { Model } from "sequelize";
import makeBackendUserMain from "../../../user/main/backendUser.main";
import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";
import { addOneBackendUserResponse } from "../../../user/main/scripts/main/addOne.script";
import makeBackendMediaManagerFolderSql from "../backendMediaManagerFolder.sql";
jest.setTimeout(100000)

describe("test backendMediaManagerFile.sql.js", () => {
  let d: d_allDomain;
  let firstFileRecordId: string;
  let secondFileRecordId: string;
  let user1: addOneBackendUserResponse

  beforeAll(async () => {
    const domainDb: Sequelize = await emptyTestDomainDb();
    const domainTransaction = await domainDb.transaction();
    const subDomainDb: Sequelize = await emptyTestSubdomainDb();
    const subDomainTransaction = await subDomainDb.transaction();

    d = {
      domainDb,
      domainTransaction,
      subDomainDb,
      subDomainTransaction,
      errorHandler: sequelizeErrorHandler,
      loggers: [
        console,
        throwIt,
      ]
    };

    const backendUser = makeBackendUserMain(d)

    user1 = (await backendUser.addOne({
      email: "testingMediaFile@test.com",
      password: "ASDFasdf1!",
      username: "testing_media_file_user1",
    })).data

  }, 100000)

  test("addOne: add a file record.", async () => {
    const mediaManagerFileSql = makeBackendMediaManagerFileSql(d)

    const file = await mediaManagerFileSql.addOne({
      systemFileName: "systemFileName.jpg",
      url: "/api/v1/media-manager/test.jpg",
      userFileName: "userFileName.jpg",
      uploadedBy: user1.id,
    })

    // record root file
    firstFileRecordId = file.data.dataValues.id
    expect(file.success).toEqual(true);
    expect(file.data.dataValues.systemFileName).toEqual("systemFileName.jpg")
    expect(file.data.dataValues.url).toEqual("/api/v1/media-manager/test.jpg")
    expect(file.data.dataValues.userFileName).toEqual("userFileName.jpg")
    expect(file.data.dataValues.uploadedBy).toEqual(user1.id)
  })

  test("getOneById: get a file record.", async () => {
    const mediaManagerFileSql = makeBackendMediaManagerFileSql(d)

    const file = await mediaManagerFileSql.getOneById({
      id: firstFileRecordId
    })

    expect(file.success).toEqual(true);
    expect(file.data.dataValues.systemFileName).toEqual("systemFileName.jpg")
    expect(file.data.dataValues.url).toEqual("/api/v1/media-manager/test.jpg")
    expect(file.data.dataValues.userFileName).toEqual("userFileName.jpg")
    expect(file.data.dataValues.uploadedBy).toEqual(user1.id)
  })
  
  test("getMany: get the files for root level.", async () => {
    const mediaManagerFileSql = makeBackendMediaManagerFileSql(d)

    const files = await mediaManagerFileSql.getMany({})

    expect(files.success).toEqual(true);
    expect(files.data.length).toBe(1)
    expect(files.data[0].dataValues.systemFileName).toEqual("systemFileName.jpg")
    expect(files.data[0].dataValues.url).toEqual("/api/v1/media-manager/test.jpg")
    expect(files.data[0].dataValues.userFileName).toEqual("userFileName.jpg")
    expect(files.data[0].dataValues.uploadedBy).toEqual(user1.id)
  })
  
  test("getMany: get the files for folder level.", async () => {
    const mediaManagerFolderSql = makeBackendMediaManagerFolderSql(d)
    const mediaManagerFileSql = makeBackendMediaManagerFileSql(d)

    const folder = await mediaManagerFolderSql.addOne({
      name: "cool folder",
      createdBy: user1.id,
    })

    await mediaManagerFileSql.addOne({
      systemFileName: "systemFileName2.jpg",
      url: "/api/v1/media-manager/test2.jpg",
      userFileName: "userFileName2.jpg",
      uploadedBy: user1.id,
      folderId: folder.data.dataValues.id,
    })

    const files = await mediaManagerFileSql.getMany({
      folderId: folder.data.dataValues.id,
    })

    
    expect(files.success).toEqual(true);
    expect(files.data.length).toBe(1)
    expect(files.data[0].dataValues.systemFileName).toEqual("systemFileName2.jpg")
    expect(files.data[0].dataValues.url).toEqual("/api/v1/media-manager/test2.jpg")
    expect(files.data[0].dataValues.userFileName).toEqual("userFileName2.jpg")
    expect(files.data[0].dataValues.uploadedBy).toEqual(user1.id)
    expect(files.data[0].dataValues.folderId).toEqual(folder.data.dataValues.id)
  })

  
  test("updateOne: update file record.", async () => {
    const mediaManagerFileSql = makeBackendMediaManagerFileSql(d)

    const file = await mediaManagerFileSql.updateOne({
      id: firstFileRecordId,
      userFileName: "blah.jpg",
    })

    expect(file.success).toEqual(true);
    expect(file.data.dataValues.systemFileName).toEqual("systemFileName.jpg")
    expect(file.data.dataValues.url).toEqual("/api/v1/media-manager/test.jpg")
    expect(file.data.dataValues.userFileName).toEqual("blah.jpg")
    expect(file.data.dataValues.uploadedBy).toEqual(user1.id)
  })

  test("deleteOne: test deleting file.", async () => {
    const mediaManagerFileSql = makeBackendMediaManagerFileSql(d)

    const deleted = await mediaManagerFileSql.deleteOne({
      id: firstFileRecordId,
      deletedBy: user1.id,
    })

    expect(deleted.success).toEqual(true);

    const file = await mediaManagerFileSql.getOneById({
      id: firstFileRecordId
    })

    expect(file.success).toEqual(true);
    expect(file.data.dataValues.systemFileName).toEqual("systemFileName.jpg")
    expect(file.data.dataValues.url).toEqual("/api/v1/media-manager/test.jpg")
    expect(file.data.dataValues.userFileName).toEqual("blah.jpg")
    expect(file.data.dataValues.uploadedBy).toEqual(user1.id)
    expect(file.data.dataValues.deletedAt).not.toBeNull()
    expect(file.data.dataValues.deletedBy).toEqual(user1.id)

    // We can not see this file in list view because it will be in trash view in the next test.
    const files = await mediaManagerFileSql.getMany({})

    expect(files.data.length).toBe(0)
  })

  test("viewTrashed: test viewing deleting files.", async () => {
    const mediaManagerFileSql = makeBackendMediaManagerFileSql(d)

    const deleted = await mediaManagerFileSql.viewTrashed()

    expect(deleted.success).toEqual(true);
    expect(deleted.data.length).toBe(1)
  })

  test("restore file: test restoring deleted files.", async () => {
    const mediaManagerFileSql = makeBackendMediaManagerFileSql(d)

    const fileRestored = await mediaManagerFileSql.restoreTrashed({
      id: firstFileRecordId
    })

    expect(fileRestored.success).toEqual(true);

    const deleted = await mediaManagerFileSql.viewTrashed()

    expect(deleted.success).toEqual(true);
    expect(deleted.data.length).toBe(0)
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback()
  })
})

