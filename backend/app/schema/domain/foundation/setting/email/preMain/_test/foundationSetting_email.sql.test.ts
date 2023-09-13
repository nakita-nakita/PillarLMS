// import { Sequelize } from "sequelize-typescript";
// import emptyTestSubdomainDb from "../../../../../../../models/subDomain/_test/emptyTestDb";
// import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
// import throwIt from "../../../../../../utils/errorHandling/loggers/throwIt.logger";
// import { d_domain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
// import emptyTestDomainDb from "../../../../../../../models/domain/_test/emptyTestDb";
// import makeFoundationSettingEmailSql from "../foundationSetting_email.sql";
// jest.setTimeout(100000)


// describe("test foundationSetting_email.sql.js", () => {
//   let d: d_domain
//   let recordId: string

//   beforeAll(async () => {
//     const domainDb: Sequelize = await emptyTestDomainDb();
//     const domainTransaction = await domainDb.transaction();

//     d = {
//       errorHandler: sequelizeErrorHandler,
//       domainDb,
//       domainTransaction,
//       loggers: [
//         console,
//         throwIt,
//       ]
//     };
//   }, 100000)

//   test("updateOne: foundationSetting_email can edit record.", async () => {
//     const settingEmail = makeFoundationSettingEmailSql(d)

//     const updateOne = await settingEmail.updateOne({
//       emailVerificationSubject: "emailVerificationSubject",
//       emailVerificationMessage: "emailVerificationMessage",
//       passwordResetSubject: "passwordResetSubject",
//       passwordResetMessage: "passwordResetMessage",
//       resetPasswordEmailSubject: "resetPasswordEmailSubject",
//       resetPasswordEmailMessage: "resetPasswordEmailMessage",
//       inviteUserSubject: "inviteUserSubject",
//       inviteUserMessage: "inviteUserMessage",
//     })
//     recordId = updateOne.data.dataValues.id
//     expect(updateOne.data.dataValues.emailVerificationSubject).toEqual("emailVerificationSubject")
//     expect(updateOne.data.dataValues.emailVerificationMessage).toEqual("emailVerificationMessage")
//     expect(updateOne.data.dataValues.passwordResetSubject).toEqual("passwordResetSubject")
//     expect(updateOne.data.dataValues.passwordResetMessage).toEqual("passwordResetMessage")
//     expect(updateOne.data.dataValues.resetPasswordEmailSubject).toEqual("resetPasswordEmailSubject")
//     expect(updateOne.data.dataValues.resetPasswordEmailMessage).toEqual("resetPasswordEmailMessage")
//     expect(updateOne.data.dataValues.inviteUserSubject).toEqual("inviteUserSubject")
//     expect(updateOne.data.dataValues.inviteUserMessage).toEqual("inviteUserMessage")
//   })

//   test("getOne: foundationSetting_email can get record.", async () => {
//     const settingEmail = makeFoundationSettingEmailSql(d)

//     const getOne = await settingEmail.getOne()
//     expect(getOne.data.dataValues.emailVerificationSubject).toEqual("emailVerificationSubject")
//     expect(getOne.data.dataValues.emailVerificationMessage).toEqual("emailVerificationMessage")
//     expect(getOne.data.dataValues.passwordResetSubject).toEqual("passwordResetSubject")
//     expect(getOne.data.dataValues.passwordResetMessage).toEqual("passwordResetMessage")
//     expect(getOne.data.dataValues.resetPasswordEmailSubject).toEqual("resetPasswordEmailSubject")
//     expect(getOne.data.dataValues.resetPasswordEmailMessage).toEqual("resetPasswordEmailMessage")
//     expect(getOne.data.dataValues.inviteUserSubject).toEqual("inviteUserSubject")
//     expect(getOne.data.dataValues.inviteUserMessage).toEqual("inviteUserMessage")
//   })

//   afterAll(async () => {
//     await d.domainTransaction.rollback();
//   })
// })

