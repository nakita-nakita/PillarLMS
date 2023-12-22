import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSiteOrganization from "../../../../../../../models/subDomain/client/site/clientSiteOrganization.model";
import makeClientSiteOrganizationSql from "../../../preMain/clientSiteOrganization.sql";

type input = {
  id?: string,
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

export default function updateOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<clientSiteOrganization> | null>> => {

    const backendUserRequestSql = makeClientSiteOrganizationSql(d);
    
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
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}