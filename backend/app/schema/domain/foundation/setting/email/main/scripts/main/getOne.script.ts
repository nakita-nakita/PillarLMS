// import { Model } from "sequelize";
// import backendSetting_email from "../../../../../../../../models/subDomain/backend/setting/backendSetting_colors.model";
// import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
// import { d_domain } from "../../../../../../../utils/types/dependencyInjection.types";
// import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
// import makeFoundationSettingEmailSql from "../../../preMain/foundationSetting_email.sql";

// export default function getOne({ domainDb, errorHandler, subDomainTransaction, loggers, }: d_domain) {
//   return async (): Promise<returningSuccessObj<Model<backendSetting_email> | null>> => {

//     const d = {
//       domainDb,
//       errorHandler,
//       transaction: subDomainTransaction,
//       loggers,
//     }
//     const emailSql = makeFoundationSettingEmailSql(d);

//     const response = await emailSql.getOne().catch(error => errorHandler(error, loggers))

//     return response
//   }
// }