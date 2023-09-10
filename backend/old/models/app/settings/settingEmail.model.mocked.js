var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const settingEmailMocked = dbMock.define('settingEmail', {
  emailVerificationSubject: "Please verify your email address on Hackathon Starter",
  emailVerificationMessage: "Thank you for registering with hackathon-starter.\n\nThis verify your email address please click on the following link, or paste this into your browser:\n\nhttp://{{host}}/account/verify/{{token}}\n\nThank you",
  passwordResetSubject: "Reset your password on Hackathon Starter",
  passwordResetMessage: "Reset your password on Hackathon Starter",
  resetPasswordEmailSubject: "Reset your password on Hackathon Starter",
  resetPasswordEmailMessage: "You are receiving this email because your request to become a user has been approved",
  inviteUserSubject: "User Request Approved",
  inviteUserMessage:"You are receiving this email because you have been invited to become a user by an admin. Please confirm below.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n{{host}}/reset/{{token}}\n\n",

})

module.exports = { settingEmailMocked };

