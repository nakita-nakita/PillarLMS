import { Model } from "sequelize";
import foundationUserProfile from "../../../../../../../models/domain/foundation/user/foundationUserProfile.model";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeFoundationUserProfileSql from "../../../preMain/foundationUserProfile.sql";
import { CallByTypeEnum } from "../../../preMain/scripts/foundationUserProfileSql/upsertOne.script";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string,
  firstName?: string,
  lastName?: string,
  username?: string,
  picture?: string,
  callByType?: CallByTypeEnum,
  circleColor?: string,
  labelColor?: string,
}

export default function upsertOne(d: dependencies) {

  const db = d.domainDb.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<foundationUserProfile> | null>> => {

    const foundationUserProfileSql = makeFoundationUserProfileSql(d)
    // const foundationUserValidation = makeFoundationUserValidation(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!id) {
      return endMainFromError({
        hint: "Id is not UUID format.",
        errorIdentifier: "foundationUserProfile_upsertOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: id
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Id is not UUID format.",
        errorIdentifier: "foundationUserProfile_upsertOne_error:0002"
      })
    }

    if (args.firstName && args.firstName.length > 50) {
      return endMainFromError({
        hint: "First name has max 50 characters limit.",
        errorIdentifier: "foundationUserProfile_upsertOne_error:0003"
      })
    }

    if (args.lastName && args.lastName.length > 50) {
      return endMainFromError({
        hint: "Last name has max 50 characters limit.",
        errorIdentifier: "foundationUserProfile_upsertOne_error:0004"
      })
    }

    if (args.username && args.username.length > 50) {
      return endMainFromError({
        hint: "Username has max 50 characters limit.",
        errorIdentifier: "foundationUserProfile_upsertOne_error:0005"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await foundationUserProfileSql.upsertOne(
      {
        id,
        ...args,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}


