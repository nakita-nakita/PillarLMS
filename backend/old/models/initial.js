const db = require("./index")


module.exports = async function initial() {
  
  // roles
  const rootRole = await db.role.findOrCreate({
    where: {
      name: "admin",
    },
    defaults: {
      name: "admin",
    },
  });

  const userRole = await db.role.findOrCreate({
    where: {
      name: "user:manager",
    },
    defaults: {
      name: "user:manager",
      // applicationId: application[0].id,
    },
  });

  // permissions
  const userReadPermission = await db.permission.findOne({
    where: {
      name: "user:read",
    },
  });

  if (!userReadPermission) {
    const newUserPermission = db.permission.build({
      name: "user:read",
    });
    await newUserPermission.save();

    const newUserPermissionRole = db.roleManyPermission.build({
      roleId: userRole[0].id,
      permissionId: newUserPermission.id,
    });
    await newUserPermissionRole.save();
  }

  const userUpdatePermission = await db.permission.findOne({
    where: {
      name: "user:edit",
    },
  });

  if (!userUpdatePermission) {
    const newUserPermission = db.permission.build({
      name: "user:edit",
    });
    await newUserPermission.save();

    const newUserPermissionRole = db.roleManyPermission.build({
      roleId: userRole[0].id,
      permissionId: newUserPermission.id,
    });
    await newUserPermissionRole.save();
  }

  //setting
  const settingEmail = await db.settingEmail.findOne();
  if (!settingEmail) {
    const newSettingEmail = db.settingEmail.build();
    await newSettingEmail.save();
  }

  const settingGeneral = await db.settingGeneral.findOne();
  if (!settingGeneral) {
    const newSettingGeneral = db.settingGeneral.build();
    await newSettingGeneral.save();
  }

  const settingPassword = await db.settingPassword.findOne();
  if (!settingPassword) {
    const newSettingPassword = db.settingPassword.build();
    await newSettingPassword.save();
  }

  const settingRequest = await db.settingRequest.findOne();
  if (!settingRequest) {
    const newSettingRequest = db.settingRequest.build();
    await newSettingRequest.save();
  }
};
