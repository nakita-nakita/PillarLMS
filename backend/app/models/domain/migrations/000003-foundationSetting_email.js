
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('foundationSetting_email', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    emailVerificationSubject: {
      type: sequelize.STRING,
      defaultValue: "Please verify your email address on Hackathon Starter",
    },
    emailVerificationMessage: {
      type: sequelize.STRING,
      defaultValue: `Thank you for registering with hackathon-starter.\n\nThis verify your email address please click on the following link, or paste this into your browser:\n\nhttp://{{host}}/account/verify/{{token}}\n\nThank you`,
    },
    passwordResetSubject: {
      type: sequelize.STRING,
      defaultValue: "Reset your password on Hackathon Starter",
    },
    passwordResetMessage: {
      type: sequelize.STRING,
      defaultValue: "Reset your password on Hackathon Starter",
    },
    resetPasswordEmailSubject: {
      type: sequelize.STRING,
      defaultValue: "Reset your password on Hackathon Starter",
    },
    resetPasswordEmailMessage: {
      type: sequelize.STRING,
      defaultValue:
        "You are receiving this email because your request to become a user has been approved. Please confirm below.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n{{host}}/reset/{{token}}\n\n",
    },
    inviteUserSubject: {
      type: sequelize.STRING,
      defaultValue: "User Request Approved",
    },
    inviteUserMessage: {
      type: sequelize.STRING,
      defaultValue:
        "You are receiving this email because you have been invited to become a user by an admin. Please confirm below.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n{{host}}/reset/{{token}}\n\n",
    },
    createdAt: {
      allowNull: false,
      type: sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: sequelize.DATE
    },
    deletedAt: {
      type: sequelize.DATE
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('foundationSetting_email');
}

module.exports = { up, down };