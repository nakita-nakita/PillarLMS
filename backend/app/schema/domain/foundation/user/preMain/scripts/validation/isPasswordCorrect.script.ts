import bcrypt from "bcryptjs"
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { password: string, encryptedPassword: string }

export default function isPasswordCorrect({ domainDb, errorHandler, domainTransaction, loggers }: d_domain) {

  const db = domainDb.models;

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const result = bcrypt.compareSync(args.password, args.encryptedPassword)

    return {
      success: true,
      result,
    }
  }
}