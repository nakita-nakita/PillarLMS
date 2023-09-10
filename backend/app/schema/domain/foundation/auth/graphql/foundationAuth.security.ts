import { and, or } from "graphql-shield"
import { isPublic, isAuthenticated, isAdmin, hasPermissions } from "../../../../../shield/rules"

const foundationAuthSecurity = {
  Query: {

  },
  Mutation: {
    foundationAuth_signup: isPublic,
    foundationAuth_signin: isPublic,
    foundationAuth_devSignin: isPublic,
    foundationAuth_forgotPassword: isPublic,
    foundationAuth_isTokenValid: isPublic,
  }
}

export default foundationAuthSecurity