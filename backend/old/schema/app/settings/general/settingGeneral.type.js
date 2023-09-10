const gql = require("graphql-tag");
const applicationType = gql`

  type SettingGeneralType {
    companyName: String,
    address1: String,
    address2: String,
    address3: String,
    address4: String,
    city: String,
    country: String,
    postal: String,
    phone: String,
    creatorITHelpSupportEmail: String,
    logo: String,
  }
  type Query {
    settingGeneral: SettingGeneralType
  }
  type Mutation {
    settingGeneralUpdate(companyName: String, address1: String, address2: String, address3: String, address4: String, city: String, country: String, postal: String, phone: String, creatorITHelpSupportEmail: String, logo: String): SettingGeneralType
  }
`;
module.exports = applicationType;
