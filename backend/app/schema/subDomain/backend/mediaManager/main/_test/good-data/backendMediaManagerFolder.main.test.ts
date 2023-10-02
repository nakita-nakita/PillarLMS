import { Sequelize } from "sequelize-typescript";
import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { addOneBackendUserResponse } from "../../../../user/main/scripts/main/addOne.script";
import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
import makeBackendUserMain from "../../../../user/main/backendUser.main";
import makeBackendMediaManagerFolderMain from "../../backendMediaManagerFolder.main";
import makeBackendMediaManagerFileMain from "../../backendMediaManagerFile.main";
jest.setTimeout(100000)

describe("test backendMediaManagerFolder.main.js", () => {
  let d: d_allDomain;
  let rootFolderId: string;
  let deepFolderId: string;
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
      email: "testingMediaFolder@test.com",
      password: "ASDFasdf1!",
      username: "testing_media_folder_user1",
    })).data

  }, 100000)

  test("addOne: works.", async () => {
    const mediaManagerFolderMain = makeBackendMediaManagerFolderMain(d)

    const folder = await mediaManagerFolderMain.addOne({
      name: "cool folder name",
      createdBy: user1.id,
    })

    // record root folder
    rootFolderId = folder.data.dataValues.id
    expect(folder.success).toEqual(true);
    expect(folder.data.dataValues.name).toEqual("cool folder name");
  })

  test("getBreadCrumbs: folder in folder view.", async () => {
    const mediaManagerFolderMain = makeBackendMediaManagerFolderMain(d)

    const folder = await mediaManagerFolderMain.addOne({
      name: "folder in folder",
      createdBy: user1.id,
      folderId: rootFolderId
    })

    deepFolderId = folder.data.dataValues.id

    const breadcrumbs = await mediaManagerFolderMain.getBreadCrumb({
      id: deepFolderId
    })

    expect(breadcrumbs.data.length).toBe(2)
  })

  test("getBreadCrumbs: folder in folder view.", async () => {
    const mediaManagerFolderMain = makeBackendMediaManagerFolderMain(d)

    const breadcrumbs = await mediaManagerFolderMain.getBreadCrumb({
      id: deepFolderId
    })

    expect(breadcrumbs.data.length).toBe(2)
  })

  test("getMany: get the second level folders and get many.", async () => {
    const mediaManagerFolderMain = makeBackendMediaManagerFolderMain(d)

    const result = await mediaManagerFolderMain.getMany({
      folderId: rootFolderId,
    })

    expect(result.data.length).toBe(1)
    expect(result.data[0].dataValues.name).toEqual("folder in folder")
  })

  test("getMany: first layer.", async () => {
    const mediaManagerFolderMain = makeBackendMediaManagerFolderMain(d)

    const result = await mediaManagerFolderMain.getMany({
      folderId: undefined,
    })

    expect(result.data.length).toBe(1)
    expect(result.data[0].dataValues.name).toEqual("cool folder name")
  })

  test("updateOne: change first folder name.", async () => {
    const mediaManagerFolderMain = makeBackendMediaManagerFolderMain(d)

    const result = await mediaManagerFolderMain.updateOne({
      id: rootFolderId,
      name: "New cool name!"
    })

    expect(result.data.dataValues.name).toBe("New cool name!")
  })

  test("getOneById.", async () => {
    const mediaManagerFolderMain = makeBackendMediaManagerFolderMain(d)

    const result = await mediaManagerFolderMain.getOneById({
      id: rootFolderId,
    })

    expect(result.data.dataValues.name).toBe("New cool name!")
  })

  test("deleteOne.", async () => {
    const mediaManagerFolderMain = makeBackendMediaManagerFolderMain(d)

    const result = await mediaManagerFolderMain.deleteOne({
      id: deepFolderId,
      deletedBy: user1.id,
    })

    expect(result.success).toBe(true)

    const shouldNotFindFolder = await mediaManagerFolderMain.getOneById({
      id: deepFolderId,
    })

    expect(shouldNotFindFolder.data).toBe(null)

    const shouldNotSeeFolderInFolder = await mediaManagerFolderMain.getMany({
      folderId: rootFolderId
    })

    expect(shouldNotSeeFolderInFolder.data.length).toBe(0)
  })

  test('deleteOne: can not delete folder with files', async () => {
    const folderMain = makeBackendMediaManagerFolderMain(d)
    const fileMain = makeBackendMediaManagerFileMain(d)

    const folder = await folderMain.addOne({
      name: "folder in folder",
      createdBy: user1.id,
      folderId: rootFolderId
    })

    const file = await fileMain.addOne({
      systemFileName: "blah.jpg",
      uploadedBy: user1.id,
      url: "url",
      userFileName: "blah.jpg",
      folderId: folder.data.dataValues.id,
    })

    const folderShouldNotDelete = await folderMain.deleteOne({
      id: folder.data.dataValues.id,
      deletedBy: user1.id
    })

    expect(folderShouldNotDelete.errorIdentifier).toEqual("backendMediaManagerFolder_deleteOne_error:0003")
  })

  test('deleteOne: can not delete folder with files, deep.', async () => {
    const folderMain = makeBackendMediaManagerFolderMain(d)
    const fileMain = makeBackendMediaManagerFileMain(d)

    const folder1 = await folderMain.addOne({
      name: "folder in folder",
      createdBy: user1.id,
    })

    const folder2 = await folderMain.addOne({
      name: "2nd",
      createdBy: user1.id,
      folderId: folder1.data.dataValues.id
    })

    const file = await fileMain.addOne({
      systemFileName: "blah.jpg",
      uploadedBy: user1.id,
      url: "url",
      userFileName: "blah.jpg",
      folderId: folder2.data.dataValues.id,
    })

    // I am trying to deleted folder 1 but folder2 with a file is in folder 1. A file can be found in nested folders and this prevents deleting.
    const folderShouldNotDelete = await folderMain.deleteOne({
      id: folder1.data.dataValues.id,
      deletedBy: user1.id
    })

    expect(folderShouldNotDelete.errorIdentifier).toEqual("backendMediaManagerFolder_deleteOne_error:0003")
  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })
})

