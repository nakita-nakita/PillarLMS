import { Model } from "sequelize";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_church from "../../../../../../../../models/subDomain/backend/setting/backendSetting_church.model";
import makeBackendSettingChurchSql from "../../../preMain/backendSetting_church.sql";

type input = {
  logo?: string,
  streetAddress?: string,
  suiteNumber?: string,
  zipCode?: string,
  city?: string,
  state?: string,
  socialTwitter?: string,
  socialFacebook?: string,
  socialInstagram?: string,
  socialWhatsapp?: string,
  socialTelegram?: string,
}

export default function updateOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSetting_church> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const backendUserRequestSql = makeBackendSettingChurchSql(d);
    
    const response = backendUserRequestSql.updateOne({
      logo: args.logo,
      streetAddress: args.streetAddress,
      suiteNumber: args.suiteNumber,
      zipCode: args.zipCode,
      city: args.city,
      state: args.state,
      socialTwitter: args.socialTwitter,
      socialFacebook: args.socialFacebook,
      socialInstagram: args.socialInstagram,
      socialWhatsapp: args.socialWhatsapp,
      socialTelegram: args.socialTelegram,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}