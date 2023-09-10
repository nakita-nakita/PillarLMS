// import { Model } from "sequelize";
// import { d_domain } from "../../../../../../../utils/types/dependencyInjection.types";
// import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
// import foundationSetting_email from "../../../../../../../../models/domain/foundation/setting/foundationSetting_email.model";

// export default function getOne({ domainDb, errorHandler, transaction, loggers, }: d_domain) {

//   const db = domainDb.models;

//   return async (): Promise<returningSuccessObj<Model<foundationSetting_email> | null>>  => {

//     const data = await db.foundationSetting_email.findOne({
//       transaction,
//     })
    
//     // .catch(error => errorHandler(error, loggers))

//     return {
//       success: true,
//       data: data ? data : null,
//     }
//   }
// }


