import { addOneBackendUserResponse } from "../../../../user/main/scripts/main/addOne.script";
import makeBackendUserMain from "../../../../user/main/backendUser.main";
import makeBackendMediaManagerFileMain from "../../backendMediaManagerFile.main";
import makeBackendMediaManagerFolderMain from "../../backendMediaManagerFolder.main";
import { makeDTestObj } from "../../../../../../utils/dependencies/makeTestDependency";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
jest.setTimeout(100000)

describe("test backendMediaManagerFile.main.js", () => {
  let d: dependencies;
  let firstFileRecordId: string;
  let secondFileRecordId: string;
  let folderRecordId: string;
  let user1: addOneBackendUserResponse

  beforeAll(async () => {

    d = await makeDTestObj()

    const backendUser = makeBackendUserMain(d)

    user1 = (await backendUser.addOne({
      email: "testingMediaFile@test.com",
      password: "ASDFasdf1!",
      username: "testing_media_file_user1",
    })).data

  }, 100000)

  test("addOne: add a file record.", async () => {
    const mediaManagerFileMain = makeBackendMediaManagerFileMain(d)

    const file = await mediaManagerFileMain.addOne({
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
    const mediaManagerFileMain = makeBackendMediaManagerFileMain(d)

    const file = await mediaManagerFileMain.getOneById({
      id: firstFileRecordId
    })

    expect(file.success).toEqual(true);
    expect(file.data.dataValues.systemFileName).toEqual("systemFileName.jpg")
    expect(file.data.dataValues.url).toEqual("/api/v1/media-manager/test.jpg")
    expect(file.data.dataValues.userFileName).toEqual("userFileName.jpg")
    expect(file.data.dataValues.uploadedBy).toEqual(user1.id)
  })
  
  test("getMany: get the files for root level.", async () => {
    const mediaManagerFileMain = makeBackendMediaManagerFileMain(d)

    const files = await mediaManagerFileMain.getMany({})

    expect(files.success).toEqual(true);
    expect(files.data.length).toBe(1)
    expect(files.data[0].dataValues.systemFileName).toEqual("systemFileName.jpg")
    expect(files.data[0].dataValues.url).toEqual("/api/v1/media-manager/test.jpg")
    expect(files.data[0].dataValues.userFileName).toEqual("userFileName.jpg")
    expect(files.data[0].dataValues.uploadedBy).toEqual(user1.id)
  })
  
  test("getMany: get the files for folder level.", async () => {
    const mediaManagerFolderMain = makeBackendMediaManagerFolderMain(d)
    const mediaManagerFileMain = makeBackendMediaManagerFileMain(d)

    const folder = await mediaManagerFolderMain.addOne({
      name: "cool folder",
      createdBy: user1.id,
    })
    folderRecordId = folder.data.dataValues.id;

    const newFile = await mediaManagerFileMain.addOne({
      systemFileName: "systemFileName2.jpg",
      url: "/api/v1/media-manager/test2.jpg",
      userFileName: "userFileName2.jpg",
      uploadedBy: user1.id,
      folderId: folder.data.dataValues.id,
    })
    secondFileRecordId = newFile.data.dataValues.id

    const files = await mediaManagerFileMain.getMany({
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
    const mediaManagerFileMain = makeBackendMediaManagerFileMain(d)

    const file = await mediaManagerFileMain.updateOne({
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
    const mediaManagerFileMain = makeBackendMediaManagerFileMain(d)

    const deleted = await mediaManagerFileMain.deleteOne({
      id: firstFileRecordId,
      deletedBy: user1.id,
    })

    expect(deleted.success).toEqual(true);

    const file = await mediaManagerFileMain.getOneById({
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
    const files = await mediaManagerFileMain.getMany({})

    expect(files.data.length).toBe(0)
  })

  test("viewTrashed: test viewing deleting files.", async () => {
    const mediaManagerFileMain = makeBackendMediaManagerFileMain(d)

    const deleted = await mediaManagerFileMain.viewTrashed()

    expect(deleted.success).toEqual(true);
    expect(deleted.data.length).toBe(1)
  })

  test("restore file: test restoring deleted files.", async () => {
    const mediaManagerFileMain = makeBackendMediaManagerFileMain(d)

    const fileRestored = await mediaManagerFileMain.restoreTrashed({
      id: firstFileRecordId
    })

    expect(fileRestored.success).toEqual(true);

    const deleted = await mediaManagerFileMain.viewTrashed()

    expect(deleted.success).toEqual(true);
    expect(deleted.data.length).toBe(0)
  })

  test('restore folders from restore file', async () => {
    const fileMain = makeBackendMediaManagerFileMain(d)
    const folderMain = makeBackendMediaManagerFolderMain(d)

    await fileMain.deleteOne({
      id: secondFileRecordId,
      deletedBy: user1.id,
    })

    await folderMain.deleteOne({
      id: folderRecordId,
      deletedBy: user1.id,
    })

    await fileMain.restoreTrashed({
      id: secondFileRecordId,
    })

    const restoreFolder = await folderMain.getOneById({
      id: folderRecordId
    })

    expect(restoreFolder.data).not.toBeNull()
    // console.log('blah')

  })

  afterAll(async () => {
    await d.subDomainTransaction.rollback();
    await d.domainTransaction.rollback()
  })
})

