import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeClientUserSql from "../../../preMain/clientUser.sql";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import clientUser from "../../../../../../../models/subDomain/client/user/clientUser.model";

type input = {
  id: string
}

export default function getOneById(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<clientUser> | null>> => {

    const pageSql = makeClientUserSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "clientUser_getOneById_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "clientUser_getOneById_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.getOneById({
      id: args.id
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}
