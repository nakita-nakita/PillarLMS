import _ from "lodash";
import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientUser from "../../../../../../../models/subDomain/client/user/clientUser.model";
import makeClientUserSql from "../../../preMain/clientUser.sql";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";

type input = {
  id: string
  isBlocked?: boolean
}

export default function addOne(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<clientUser> | null>> => {

    const pageSql = makeClientUserSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "clientUser_addOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "clientUser_addOne_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await pageSql.addOne(args).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}