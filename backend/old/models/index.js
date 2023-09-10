const config = require("../../app/config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    // operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// app - toDo
// db.toDo = require("./app/toDo/toDo.model")(sequelize, Sequelize);
// db.toDoList = require("./app/toDo/toDoList.model")(sequelize, Sequelize);

// app - setting
db.settingEmail = require("./app/settings/settingEmail.model.js")(sequelize, Sequelize);
db.settingGeneral = require("./app/settings/settingGeneral.model.js")(sequelize, Sequelize);
db.settingPassword = require("./app/settings/settingPassword.model.js")(sequelize, Sequelize);
db.settingRequest = require("./app/settings/settingRequest.model.js")(sequelize, Sequelize);

// user
db.permission = require("./user/permission.model.js")(sequelize, Sequelize);
db.userRequest = require("./user/userRequest.model.js")(sequelize, Sequelize);
db.role = require("./user/role.model.js")(sequelize, Sequelize);
db.roleManyPermission = require("./user/roleManyPermission.model.js")(sequelize, Sequelize);
db.user = require("./user/user.model.js")(sequelize, Sequelize);
db.userManyPermission = require("./user/userManyPermission.model.js")(sequelize, Sequelize);
db.userProfile = require("./user/userProfile.model.js")(sequelize, Sequelize);
db.userManyRole = require("./user/userManyRole.model.js")(sequelize, Sequelize);
db.notification = require("./user/notification.model")(sequelize, Sequelize);

// utils
db.log = require("./system/log.model.js")(sequelize, Sequelize);

// images
db.log_image_user_avatar = require("./image_log/user-avatar.model")(sequelize, Sequelize)
db.log_image_company_logo = require("./image_log/company-logo.model")(sequelize, Sequelize)

// courses
db.course = require("./app/courses/courses.model")(sequelize, Sequelize)

// course settings
db.courseSettings = require("./app/courses/courseSettings.model")(sequelize, Sequelize)
db.courseSettingsReadAccess = require("./app/courses/courseSettingsReadAccess.model")(sequelize, Sequelize)
db.courseSettingsSettingAccess = require("./app/courses/courseSettingsSettingAccess.model")(sequelize, Sequelize)
db.courseSettingsUpdateAccess = require("./app/courses/courseSettingsUpdateAccess.model")(sequelize, Sequelize)

//course discussion
db.courseDiscussion = require("./app/courseDiscussion/courseDiscussion.model")(sequelize, Sequelize)
db.courseDiscussionComment = require("./app/courseDiscussion/courseDiscussionComment.model")(sequelize, Sequelize)
// db.courseDiscussionCommentVote = require("./app/courseDiscussion/courseDiscussionCommentVote.model")(sequelize, Sequelize)
db.courseDiscussionVote = require("./app/courseDiscussion/courseDiscussionVote.model")(sequelize, Sequelize)

//course Module
db.courseModule = require("./app/courseModules/courseModule.model")(sequelize, Sequelize)
db.courseLesson = require("./app/courseModules/courseLesson.model")(sequelize, Sequelize)

//course Lessons
db.lessonVideoYoutube = require("./app/courseElements/lessons/lessonVideoYoutube.model")(sequelize, Sequelize)

// User relationships

// User has a profile
db.user.hasOne(db.userProfile)
db.userProfile.belongsTo(db.user)

// User has notifications
db.user.hasMany(db.notification)
db.notification.belongsTo(db.user)

// User Many to Many with Permissions Part: 1
db.user.hasMany(db.userManyPermission)
db.userManyPermission.belongsTo(db.user)

// User Many to Many with Permissions Part: 2
db.permission.hasMany(db.userManyPermission)
db.userManyPermission.belongsTo(db.permission)

// User Many to Many with Role Part: 1
db.user.hasMany(db.userManyRole)
db.userManyRole.belongsTo(db.user)

// User Many to Many with Role Part: 2
db.role.hasMany(db.userManyRole)
db.userManyRole.belongsTo(db.role)

// Permissions Many to Many with Roles Part: 1
db.permission.hasMany(db.roleManyPermission)
db.roleManyPermission.belongsTo(db.permission)

// Permissions Many to Many with Roles Part: 2
db.role.hasMany(db.roleManyPermission)
db.roleManyPermission.belongsTo(db.role)


// To Do Relationships

//ToDoLists Many to Many with ToDo Part: 1
// db.toDoList.hasMany(db.toDo)
// db.toDo.belongsTo(db.toDoList)

// //ToDoLists Many to Many with ToDo Part: 2
// db.toDoList.hasMany(db.toDoListManyToDo)
// db.toDoListManyToDo.belongsTo(db.toDoList)


// user owns toDo List
// db.user.hasMany(db.toDoList)
// db.toDoList.belongsTo(db.user)

// Many Users - Many Courses Access
// Read
db.user.hasMany(db.courseSettingsReadAccess);
db.courseSettingsReadAccess.belongsTo(db.user)

db.course.hasMany(db.courseSettingsReadAccess);
db.courseSettingsReadAccess.belongsTo(db.course)

// Update
db.user.hasMany(db.courseSettingsUpdateAccess);
db.courseSettingsUpdateAccess.belongsTo(db.user)

db.course.hasMany(db.courseSettingsUpdateAccess);
db.courseSettingsUpdateAccess.belongsTo(db.course)

// Setting
db.user.hasMany(db.courseSettingsSettingAccess);
db.courseSettingsSettingAccess.belongsTo(db.user)

db.course.hasMany(db.courseSettingsSettingAccess);
db.courseSettingsSettingAccess.belongsTo(db.course)


// One course - one course settings - one owner in settings
db.user.hasOne(db.courseSettings, {
  // as: 'parentChildren',
  foreignKey: { name: 'ownerId', allowNull: false },
  // constraints: true,
});
// db.courseSettings.belongsTo(db.user)

db.course.hasOne(db.courseSettings)
db.courseSettings.belongsTo(db.course)

// courseDiscussion
db.user.hasMany(db.courseDiscussion);
db.courseDiscussion.belongsTo(db.user)

db.course.hasMany(db.courseDiscussion);
db.courseDiscussion.belongsTo(db.course)

db.user.hasMany(db.courseDiscussionVote);
db.courseDiscussionVote.belongsTo(db.user)

db.courseDiscussion.hasMany(db.courseDiscussionVote);
db.courseDiscussionVote.belongsTo(db.courseDiscussion)


db.user.hasMany(db.courseDiscussionComment);
db.courseDiscussionComment.belongsTo(db.user)

db.courseDiscussion.hasMany(db.courseDiscussionComment);
db.courseDiscussionComment.belongsTo(db.courseDiscussion)

// db.user.hasMany(db.courseDiscussionCommentVote);
// db.courseDiscussionCommentVote.belongsTo(db.user)

// db.courseDiscussionComment.hasMany(db.courseDiscussionCommentVote);
// db.courseDiscussionCommentVote.belongsTo(db.courseDiscussionComment)


// course Modules
db.course.hasMany(db.courseModule);
db.courseModule.belongsTo(db.course)

db.course.hasMany(db.courseLesson);
db.courseLesson.belongsTo(db.course)

db.courseModule.hasMany(db.courseLesson);
db.courseLesson.belongsTo(db.courseModule)

// lesson modules
db.courseLesson.hasOne(db.lessonVideoYoutube)
db.lessonVideoYoutube.belongsTo(db.courseLesson)


//logs
db.user.hasMany(db.log_image_user_avatar)
db.log_image_user_avatar.belongsTo(db.user)

db.user.hasMany(db.log_image_company_logo)
db.log_image_company_logo.belongsTo(db.user)


module.exports = db;
