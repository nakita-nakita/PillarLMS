import gql from "graphql-tag"
import { paginationType } from "../../../../utils"

const backendMediaManagerGqlType = gql`

  type BackendMediaManagerFolderType {
    id: ID
    name: String
    folderId: String
    createdAt: String
    deletedAt: String
    deletedBy: String
    uploadedBy: String
  }
  
  type BackendMediaManagerFileType {
    id: ID
    userFileName: String
    systemFileName: String
    url: String
    folderId: String
    createdAt: String
    deletedAt: String
    deletedBy: String
    uploadedBy: String
  }

  type BreadCrumbType {
    id: String
    name: String 
    order: Int
  }

  type Query {
    backendMediaManagerFile_getOneById(id: ID!): BackendMediaManagerFileType
    backendMediaManagerFile_viewTrash: [BackendMediaManagerFileType]
  
    backendMediaManagerFile_getMany(folderId: ID): [BackendMediaManagerFileType]
    backendMediaManagerFolder_getMany(folderId: ID): [BackendMediaManagerFolderType]

    backendMediaManagerFolder_getBreadCrumb(folderId: ID!): [BreadCrumbType]
  }

  type Mutation {
    # adding file is done through Express uploading
    backendMediaManagerFile_rename(id: ID!, name: String!): BackendMediaManagerFileType
    backendMediaManagerFile_deleteOne(id: ID!): GlobalSuccessType

    backendMediaManagerFolder_addOne(name: String!, folderId: ID): BackendMediaManagerFolderType
    backendMediaManagerFolder_rename(id: ID!, name: String!): BackendMediaManagerFolderType
    backendMediaManagerFolder_deleteOne(id: ID!): GlobalSuccessType

    backendMediaManagerFile_restoreTrashed(id: ID!): GlobalSuccessType
  }
`

export default backendMediaManagerGqlType