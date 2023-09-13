// import { Model, WhereOptions } from "sequelize";
// import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
// import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
// import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

// type input = {
//   id: string,
//   isAdmin: boolean,
// }

// export default function findOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

//   const db = subDomainDb.models;

//   return async (where: WhereOptions<backendUser>): Promise<returningSuccessObj<Model<backendUser> | null>> => {

//     const data = await db.backendUser.findOne({
//       where,
//       transaction: subDomainTransaction,
//     }).catch(error => errorHandler(error, loggers))

//     return {
//       success: true,
//       data,
//     }
//   }
// }


