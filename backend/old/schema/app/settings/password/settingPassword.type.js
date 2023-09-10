const gql = require("graphql-tag");
const applicationType = gql`

  type SettingPasswordType {
    passwordLength: Int,
    shouldHaveUppercaseLetter: Boolean,
    shouldHaveLowercaseLetter: Boolean,
    shouldHaveNumber: Boolean,
    shouldHaveSymbol: Boolean,
  }
  type Query {
    settingPassword: SettingPasswordType
  }
  type Mutation {
    settingPasswordUpdate(passwordLength: Int, shouldHaveUppercaseLetter: Boolean, shouldHaveLowercaseLetter: Boolean, shouldHaveNumber: Boolean, shouldHaveSymbol: Boolean): SettingPasswordType
  }
`;
module.exports = applicationType;
