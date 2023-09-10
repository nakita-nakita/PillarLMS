import { Model } from "sequelize";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_links from "../../../../../../../../models/subDomain/backend/setting/backendSetting_links.model";
import makeBackendSettingLinksSql from "../../../preMain/backendSetting_links.sql";

type input = {
  donationLink?: string,
  virtualServicesLink?: string,
  defaultMetaPicture?: string,
  defaultMetaTitle?: string,
  defaultMetaDescription?: string,
}

export default function updateOne({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSetting_links> | null>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const linksSql = makeBackendSettingLinksSql(d);

    const response = await linksSql.updateOne({
      donationLink: args.donationLink,
      virtualServicesLink: args.virtualServicesLink,
      defaultMetaPicture: args.defaultMetaPicture,
      defaultMetaTitle: args.defaultMetaTitle,
      defaultMetaDescription: args.defaultMetaDescription,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}