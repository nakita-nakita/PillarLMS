import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionNormal from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionNormal.model";
import { SelectionTypeEnum } from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";

type input = {
  pageId: string;
  name: string;
  author: string;
  selectionType: SelectionTypeEnum;
  selectionId: string;
  orderNumber: number;
  userAnswersJsonB?: string;
  webAssetImport?: string;
  menuJsonB?: string;
  isReady?: boolean;
};

export default function addOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionNormal> | null>> => {
    // Use create method to add a new instance
    const instance = await db.backendSiteDesignerPageSectionNormal.create(args, {
      transaction: d.subDomainTransaction,
      returning: true,
    })
    
    // .catch(error => d.errorHandler(error, d.loggers));

    // Check if the instance was successfully created
    if (instance) {
      return {
        success: true,
        data: instance,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  };
}
