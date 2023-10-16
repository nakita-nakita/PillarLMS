import { Model } from "sequelize";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain, d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_church from "../../../../../../../../models/subDomain/backend/setting/backendSettingOrganization.model";
import makeBackendSettingChurchSql from "../../../preMain/backendSettingOrganization.sql";
import makeBackendSettingOrganizationSql from "../../../preMain/backendSettingOrganization.sql";

type input = {
  id: string,
  logo?: string,
  name?: string,
  shouldApplyToTopNavMenu?: boolean,
  addressLine1?: string,
  addressLine2?: string,
  cityLocality?: string,
  stateProvinceRegion?: string,
  postalCode?: string,
  socialFacebook?: string,
  socialX?: string,
  socialInstagram?: string,
  socialLinkedIn?: string,
  socialYouTube?: string,
  socialPinterest?: string,
  socialWhatsapp?: string,
  socialReddit?: string,
}

export default function updateOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSetting_church> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const backendUserRequestSql = makeBackendSettingOrganizationSql(d);
    
    const response = backendUserRequestSql.upsertOne({
      id: args.id,
      logo: args.logo,
      name: args.name,
      shouldApplyToTopNavMenu: args.shouldApplyToTopNavMenu,
      addressLine1: args.addressLine1,
      addressLine2: args.addressLine2,
      cityLocality: args.cityLocality,
      postalCode: args.postalCode,
      socialFacebook: args.socialFacebook,
      socialInstagram: args.socialInstagram,
      socialLinkedIn: args.socialLinkedIn,
      socialPinterest: args.socialPinterest,
      socialReddit: args.socialReddit,
      socialWhatsapp: args.socialWhatsapp,
      socialX: args.socialX,
      socialYouTube: args.socialYouTube,
      stateProvinceRegion: args.stateProvinceRegion,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}