import gql from "graphql-tag"

const backendSiteDesignerSettingGqlType = gql`
type BackendSiteDesignerSettingType {
  canAllRead: Boolean
  canAllUpdate: Boolean
}

input SiteDesignerAccessInput {
  id: ID
  userId: ID!
}

type UserAccessType {
  userId: String
  username: String
  picture: String
}

type Query {
  backendSiteDesignerSetting_getOne: BackendSiteDesignerSettingType

  backendSiteDesignerSetting_readAccess_getAll: [UserAccessType]
  backendSiteDesignerSetting_settingAccess_getAll: [UserAccessType]
  backendSiteDesignerSetting_updateAccess_getAll: [UserAccessType]
}

type Mutation {
  backendSiteDesignerSetting_updateOne(id: ID!, canAllRead: Boolean, canAllUpdate: Boolean): BackendSiteDesignerSettingType
  backendSiteDesignerSetting_readAccess_setList(list: [SiteDesignerAccessInput]): [UserAccessType]
  backendSiteDesignerSetting_settingAccess_setList(list: [SiteDesignerAccessInput]): [UserAccessType]
  backendSiteDesignerSetting_updateAccess_setList(list: [SiteDesignerAccessInput]): [UserAccessType]
}

`

export default backendSiteDesignerSettingGqlType