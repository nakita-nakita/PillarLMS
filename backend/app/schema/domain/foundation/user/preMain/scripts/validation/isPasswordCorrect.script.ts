import bcrypt from "bcryptjs"
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { password: string, encryptedPassword: string }

export default function isPasswordCorrect(d: dependencies) {

  const db = d.domainDb.models;

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const result = bcrypt.compareSync(args.password, args.encryptedPassword)

    return {
      success: true,
      result,
    }
  }
}