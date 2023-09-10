const gql = require("graphql-tag");
const applicationType = gql`

  enum SettingRequestTypeEnum {
    ANYONE
    REQUEST
    REQUEST_NO_PASSWORD
    MANUAL
  }

  type SettingRequestType {
    type: SettingRequestTypeEnum,
    password: String
  }
  type Query {
    settingRequest: SettingRequestType
  }
  type Mutation {
    settingRequestUpdate(type: SettingRequestTypeEnum, password: String): SettingRequestType
  }
`;
module.exports = applicationType;
