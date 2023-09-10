const { or } = require("graphql-shield");
const { isAuthenticated, isAdmin, isOpened, isOwnerOfToDoList } = require("./rules")

module.exports = {
  Query: {

    //userRequest
    userRequest: isAdmin,
    userRequestMany: isAdmin,

    //user
    user: isAuthenticated,
    userMany: isAdmin,
    userAvatarChip: isAuthenticated,
    userMyself: isAuthenticated,

    //role
    role: isAdmin,
    roleMany: isAdmin,

    //permission
    permission: isAdmin,
    permissionMany: isAdmin,

    //setings
    settingEmail: isAdmin,
    settingGeneral: isAdmin,
    settingPassword: isAdmin,
    settingRequest: isAdmin,

    //notifications
    notification: isAuthenticated,
    notificationMany: isAuthenticated,
    doYouHaveNewNotifications: isAuthenticated,

    //course discussions
    courseDiscussions: isAdmin,
    courseDiscussion:isAdmin,
    // courseDiscussionGetMyVote: isAdmin,
  },
  Mutation: {
    //auth
    signup: isOpened,
    signin: isOpened,

    //userRequest
    // userRequestAdd: isOpened,
    userRequestUpdate: isAdmin,
    userRequestDelete: isAdmin,

    //user
    userAdd: isAdmin,
    userUpdate: isAdmin,
    userDelete: isAdmin,
    userAddPermission: isAdmin,
    userRemovePermission: isAdmin,
    userAddRole: isAdmin,
    userRemoveRole: isAdmin,
    userUpdateMyUser: isAuthenticated,

    //role
    roleAdd: isAdmin,
    roleUpdate: isAdmin,
    roleDelete: isAdmin,
    roleAddPermission: isAdmin,
    roleRemovePermission: isAdmin,

    //permission
    permissionAdd: isAdmin,
    permissionUpdate: isAdmin,
    permissionDelete: isAdmin,

    //settings
    settingEmailUpdate: isAdmin,
    settingGeneralUpdate: isAdmin,
    settingPasswordUpdate: isAdmin,
    settingRequestUpdate: isAdmin,

    //notifications
    notificationsHaveBeenSeen: isAuthenticated,
    notificationHasBeenClicked: isAuthenticated,

    //courses -- change
    courseUpdate: isAdmin,
    courseAdd: isAdmin,
    courseSettingsUpdate: isAdmin,

    //courseDiscussion
    courseDiscussionAdd: isAdmin,
    courseDiscussionSetMyVote: isAdmin,
    courseDiscussionCommentAdd: isAdmin,
    // //toDoList
    // toDoListAdd: isAuthenticated,
    // toDoListUpdate: or(isAdmin, isOwnerOfToDoList),
    // toDoListDelete: or(isAdmin, isOwnerOfToDoList),

    // toDoListAddToDo: or(isAdmin, isOwnerOfToDoList),
    // toDoListUpdateToDo: or(isAdmin, isOwnerOfToDoList),
    // toDoListRemoveToDo: or(isAdmin, isOwnerOfToDoList),
    //toDo
    // toDoAdd: isAuthenticated,
    // toDoUpdate: or(isAdmin, isOwnerOfToDo),
    // toDoDelete: or(isAdmin, isOwnerOfToDo),

  },
};
