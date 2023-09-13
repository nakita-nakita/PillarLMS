// import { Model } from "sequelize";
// import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
// import { d_domain } from "../../../../../../../utils/types/dependencyInjection.types";
// import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
// import foundationSetting_email from "../../../../../../../../models/domain/foundation/setting/foundationSetting_email.model";
// import makeFoundationSettingEmailSql from "../../../preMain/foundationSetting_email.sql";

// type input = {
//   emailVerificationSubject?: string,
//   emailVerificationMessage?: string,
//   passwordResetSubject?: string,
//   passwordResetMessage?: string,
//   resetPasswordEmailSubject?: string,
//   resetPasswordEmailMessage?: string,
//   inviteUserSubject?: string,
//   inviteUserMessage?: string,
// }

// export default function updateOne({ domainDb, errorHandler, transaction, loggers, }: d_domain) {
//   return async (args: input): Promise<returningSuccessObj<Model<foundationSetting_email> | null>> => {

//     const d = {
//       domainDb,
//       errorHandler,
//       transaction,
//       loggers,
//     }
//     const emailSql = makeFoundationSettingEmailSql(d);

//     const response = await emailSql.updateOne({
//       emailVerificationSubject: args.emailVerificationSubject,
//       emailVerificationMessage: args.emailVerificationMessage,
//       passwordResetSubject: args.passwordResetSubject,
//       passwordResetMessage: args.passwordResetMessage,
//       resetPasswordEmailSubject: args.resetPasswordEmailSubject,
//       resetPasswordEmailMessage: args.resetPasswordEmailMessage,
//       inviteUserSubject: args.inviteUserSubject,
//       inviteUserMessage: args.inviteUserMessage,
//     }).catch(error => errorHandler(error, loggers))

//     return response
//   }
// }