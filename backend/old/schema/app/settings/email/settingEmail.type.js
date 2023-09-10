const gql = require("graphql-tag");

const applicationType = gql`

type SettingEmailType {
    emailVerificationSubject: String,
    emailVerificationMessage: String,
    passwordResetSubject: String,
    passwordResetMessage: String,
    resetPasswordEmailSubject: String,
    resetPasswordEmailMessage: String,
    inviteUserSubject: String,
    inviteUserMessage: String,
  }
  type Query {
    settingEmail: SettingEmailType
  }
  type Mutation {
    settingEmailUpdate(emailVerificationSubject: String, emailVerificationMessage: String, passwordResetSubject: String, passwordResetMessage: String, resetPasswordEmailSubject: String, resetPasswordEmailMessage: String, inviteUserSubject: String, inviteUserMessage: String,): SettingEmailType
  }
`;
module.exports = applicationType;
