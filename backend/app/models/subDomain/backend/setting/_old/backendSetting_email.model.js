module.exports = (sequelize, Sequelize) => {
  const backendSetting_email = sequelize.define(
    "backendSetting_email",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      emailVerificationSubject: {
        type: Sequelize.STRING,
        defaultValue: "Please verify your email address on Hackathon Starter",
      },
      emailVerificationMessage: {
        type: Sequelize.STRING,
        defaultValue: `Thank you for registering with hackathon-starter.\n\nThis verify your email address please click on the following link, or paste this into your browser:\n\nhttp://{{host}}/account/verify/{{token}}\n\nThank you`,
      },
      passwordResetSubject: {
        type: Sequelize.STRING,
        defaultValue: "Reset your password on Hackathon Starter",
      },
      passwordResetMessage: {
        type: Sequelize.STRING,
        defaultValue: "Reset your password on Hackathon Starter",
      },
      resetPasswordEmailSubject: {
        type: Sequelize.STRING,
        defaultValue: "Reset your password on Hackathon Starter",
      },
      resetPasswordEmailMessage: {
        type: Sequelize.STRING,
        defaultValue:
          "You are receiving this email because your request to become a user has been approved. Please confirm below.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n{{host}}/reset/{{token}}\n\n",
      },
      inviteUserSubject: {
        type: Sequelize.STRING,
        defaultValue: "User Request Approved",
      },
      inviteUserMessage: {
        type: Sequelize.STRING,
        defaultValue:
          "You are receiving this email because you have been invited to become a user by an admin. Please confirm below.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n{{host}}/reset/{{token}}\n\n",
      },
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return backendSetting_email;
};
