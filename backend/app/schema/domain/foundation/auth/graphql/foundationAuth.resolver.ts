import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makeFoundationAuthMain from "../main/foundationAuth.main";

const foundation_authResolver = {
  Mutation: {
    foundationAuth_signup: async (parent, args, ctx) => {
      const main = makeFoundationAuthMain(ctx.d)

      const response = await main.signup({
        email: args.email,
        password: args.password,
        confirmPassword: args.confirmPassword,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    foundationAuth_signin: async (parent, args, ctx) => {
      const main = makeFoundationAuthMain(ctx.d)

      const response = await main.signin({
        email: args.email,
        password: args.password,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
    foundationAuth_forgotPassword: async (parent, args, ctx) => {
      const main = makeFoundationAuthMain(ctx.d)

      const response = await main.forgotPassword({
        email: args.email,
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
    foundationAuth_isTokenValid: async (parent, args, ctx) => {
      const main = makeFoundationAuthMain(ctx.d)

      const response = await main.isTokenValid({
        token: args.token
      })

      if (response?.success) {
        return response

      } else {
        return graphqlError(response)
      }
    },
  },
};

export default foundation_authResolver