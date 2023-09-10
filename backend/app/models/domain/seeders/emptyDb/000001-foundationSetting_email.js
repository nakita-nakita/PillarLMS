const { v4: uuidv4 } = require('uuid');
// const { foundationSetting_foundationUserRequestEnum } = require('../../foundation/setting/foundationSetting_foundationUserRequest.model');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('foundationSetting_email', [
    {
      id: uuidv4(),
      // emailVerificationSubject: "emailVerificationSubject",
      // emailVerificationMessage: "emailVerificationMessage",
      // passwordResetSubject: "passwordResetSubject",
      // passwordResetMessage: "passwordResetMessage",
      // resetPasswordEmailSubject: "resetPasswordEmailSubject",
      // resetPasswordEmailMessage: "resetPasswordEmailMessage",
      // inviteUserSubject: "inviteUserSubject",
      // inviteUserMessage: "inviteUserMessage",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
}

module.exports = { up, down };
