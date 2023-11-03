import makeBackendMediaManagerFolderSql from "../backendMediaManagerFolder.sql";
import makeBackendUserMain from "../../../user/main/backendUser.main";
import { addOneBackendUserResponse } from "../../../user/main/scripts/main/addOne.script";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency";
jest.setTimeout(100000)

describe("test backendMediaManagerFolder.sql.js", () => {
  let d: dependencies;
  let rootFolderId: string;
  let deepFolderId: string;
  let user1: addOneBackendUserResponse

  beforeAll(async () => {

    d = await makeDTestObj()

    const backendUser = makeBackendUserMain(d)

    user1 = (await backendUser.addOne({
      email: "testingMediaFolder@test.com",
      password: "ASDFasdf1!",
      username: "testing_media_folder_user1",
    })).data

  }, 100000)

  test("addOne: works.", async () => {
    const mediaManagerFolderSql = makeBackendMediaManagerFolderSql(d)

    const folder = await mediaManagerFolderSql.addOne({
      name: "cool folder name",
      createdBy: user1.id,
    })
    
    // record root folder
    rootFolderId = folder.data.dataValues.id
    expect(folder.success).toEqual(true);
    expect(folder.data.dataValues.name).toEqual("cool folder name");
  })

  test("getBreadCrumbs: folder in folder view.", async () => {
    const mediaManagerFolderSql = makeBackendMediaManagerFolderSql(d)

    const folder = await mediaManagerFolderSql.addOne({
      name: "folder in folder",
      createdBy: user1.id,
      folderId:rootFolderId
    })

    deepFolderId = folder.data.dataValues.id

    const breadcrumbs = await mediaManagerFolderSql.getBreadCrumb({
      id: deepFolderId
    })

    expect(breadcrumbs.data.length).toBe(2)
  })
  
  test("getBreadCrumbs: folder in folder view.", async () => {
    const mediaManagerFolderSql = makeBackendMediaManagerFolderSql(d)

    const breadcrumbs = await mediaManagerFolderSql.getBreadCrumb({
      id: deepFolderId
    })

    expect(breadcrumbs.data.length).toBe(2)
  })

  test("getMany: get the second level folders and get many.", async () => {
    const mediaManagerFolderSql = makeBackendMediaManagerFolderSql(d)

    const result = await mediaManagerFolderSql.getMany({
      folderId: rootFolderId,
    })

    expect(result.data.length).toBe(1)
    expect(result.data[0].dataValues.name).toEqual("folder in folder")
  })

  test("getMany: first layer.", async () => {
    const mediaManagerFolderSql = makeBackendMediaManagerFolderSql(d)

    const result = await mediaManagerFolderSql.getMany({
      folderId: undefined,
    })

    expect(result.data.length).toBe(1)
    expect(result.data[0].dataValues.name).toEqual("cool folder name")
  })

  test("updateOne: change first folder name.", async () => {
    const mediaManagerFolderSql = makeBackendMediaManagerFolderSql(d)

    const result = await mediaManagerFolderSql.updateOne({
      id: rootFolderId,
      name: "New cool name!"
    })

    expect(result.data.dataValues.name).toBe("New cool name!")
  })

  test("getOneById.", async () => {
    const mediaManagerFolderSql = makeBackendMediaManagerFolderSql(d)

    const result = await mediaManagerFolderSql.getOneById({
      id: rootFolderId,
    })

    expect(result.data.dataValues.name).toBe("New cool name!")
  })
  
  test("deleteOne.", async () => {
    const mediaManagerFolderSql = makeBackendMediaManagerFolderSql(d)

    const result = await mediaManagerFolderSql.deleteOne({
      id: deepFolderId,
      deletedBy: user1.id,
    })

    expect(result.success).toBe(true)

    const shouldNotFindFolder = await mediaManagerFolderSql.getOneById({
      id: deepFolderId,
    })

    expect(shouldNotFindFolder.data).toBe(null)

    const shouldNotSeeFolderInFolder = await mediaManagerFolderSql.getMany({
      folderId: rootFolderId
    })

    expect(shouldNotSeeFolderInFolder.data.length).toBe(0)
  })

  
  test("restore one.", async () => {
    const mediaManagerFolderSql = makeBackendMediaManagerFolderSql(d)

    const result = await mediaManagerFolderSql.restoreTrashed({
      id: deepFolderId,
    })

    expect(result.success).toBe(true)

    const shouldFindFolder = await mediaManagerFolderSql.getOneById({
      id: deepFolderId,
    })

    expect(shouldFindFolder.data).not.toBeNull()

    const shouldNotSeeFolderInFolder = await mediaManagerFolderSql.getMany({
      folderId: rootFolderId
    })

    expect(shouldNotSeeFolderInFolder.data.length).toBe(1)
  })
  
  afterAll(async () => {
    await d.subDomainTransaction.rollback();
  })

  test('getAllChildFolders', async () => {
    const folderSql = makeBackendMediaManagerFolderSql(d)

    const folderLevel1 = await folderSql.addOne({
      createdBy: user1.id,
      name: "level1"
    })
    const folderLevel2Folder1 = await folderSql.addOne({
      createdBy: user1.id,
      name: "level1",
      folderId: folderLevel1.data.dataValues.id,
    })
    const folderLevel2Folder2 = await folderSql.addOne({
      createdBy: user1.id,
      name: "level1",
      folderId: folderLevel1.data.dataValues.id,
    })
    const folderLevel3Folder1 = await folderSql.addOne({
      createdBy: user1.id,
      name: "level1",
      folderId: folderLevel2Folder1.data.dataValues.id,
    })
    const folderLevel3Folder2 = await folderSql.addOne({
      createdBy: user1.id,
      name: "level1",
      folderId: folderLevel2Folder2.data.dataValues.id,
    })

    const getChildFolders = await folderSql.getAllChildFolders({
      id: folderLevel1.data.dataValues.id,
    })

    expect(getChildFolders.data.length).toBe(4)


  })
})

