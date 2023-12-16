import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionNormal from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionNormal.model";
import { SelectionTypeEnum } from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";

type input = {
  id: string;
  name?: string;
  webAssetImport?: string;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
  orderNumber?: number;
  menuJsonB?: string;
  userAnswersJsonB?: string;
  isReady?: boolean;
};

export default function updateOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionNormal> | null>> => {
    const { id, ...updateFields } = args;

    // Use update method to update the instance
    const [affectedRows] = await db.backendSiteDesignerPageSectionNormal.update(updateFields, {
      where: { id },
      returning: true,
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    // Check if any rows were affected to determine if the update was successful
    if (affectedRows > 0) {
      // Instance updated successfully
      const updatedInstance = await db.backendSiteDesignerPageSectionNormal.findByPk(id, {
        transaction: d.subDomainTransaction,
      });
      return {
        success: true,
        data: updatedInstance,
      };
    } else {
      // No instance found with the given ID
      return {
        success: false,
        data: null,
      };
    }
  };
}
