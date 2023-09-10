import { Model } from "sequelize";
import foundationUserProfile from "../../../../../../../models/domain/foundation/user/foundationUserProfile.model";
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeFoundationUserProfileSql from "../../../preMain/foundationUserProfile.sql";
import makeFoundationUserValidation from "../../../preMain/foundationUser.validation";

type input = { id: string }

export default function getOneById({ domainDb, errorHandler, transaction, loggers, }: d_domain) {

  const db = domainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<foundationUserProfile> | null>> => {

    const d = {
      domainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const foundationUserProfileSql = makeFoundationUserProfileSql(d);
    const foundationUserValidation = makeFoundationUserValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "foundationUserProfile_getOneById_error0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "foundationUserProfile_getOneById_error0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await foundationUserProfileSql.getOneById({
      id: args.id,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}