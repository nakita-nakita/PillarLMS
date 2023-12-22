import _ from "lodash";
import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeClientUserSql from "../../../preMain/clientUser.sql";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import clientUser from "../../../../../../../models/subDomain/client/user/clientUser.model";

type input = {
  id: string
  isBlocked?: boolean
}

export default function updateOne(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<clientUser> | null>> => {

    const pageSql = makeClientUserSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "clientUser_updateOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "clientUser_updateOne_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.updateOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}