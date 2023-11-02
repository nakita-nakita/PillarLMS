// const { errorHandler } = require("../../../../../utils");
// const { graphqlError } = require("../../../../../utils/errorHandling/handers/graphql.errorhandler");
// const subDomainDb = require("../../../../../../models/subDomain");
// const makeMain = require('../main/foundationSetting_password.main');

// const main = makeMain(subDomainDb)

// const settingPasswordResolver = {
//   Query: {
//     backendSetting_password_get: async (parent, args, ctx) => {
//       const response = await main.get().catch(errorHandler)

//       if (response?.success) {
//         return response.data
//       } else {
//         return graphqlErrorr(response?.error)
//       }
//     },
//   },
//   Mutation: {
//     backendSetting_password_update: async (parent, args, ctx) => {

//       const response = await main.update({
//         passwordLength: args.passwordLength,
//         shouldHaveUppercaseLetter: args.shouldHaveUppercaseLetter,
//         shouldHaveLowercaseLetter: args.shouldHaveLowercaseLetter,
//         shouldHaveNumber: args.shouldHaveNumber,
//         shouldHaveSymbol: args.shouldHaveSymbol,
//       }).catch(errorHandler)

//       if (response?.success) {
//         return response.data
//       } else {
//         return graphqlErrorlError(response?.error)
//       }
//     },
//   }
// };
// module.exports = settingPasswordResolver;
