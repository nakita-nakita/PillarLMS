import { Model, Op } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageSectionLoud from "../../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPageSectionLoud.model";
import { SelectionTypeEnum } from "../../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";

type Input = {
  pageId: string;
  id?: string;
  name?: string;
  author?: string;
  webAssetImport?: string;
  menuJsonB?: string;
  userAnswersJsonB?: string;
  isReady?: boolean;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
};

export default function upsertOne(d: dependencies) {
  const { subDomainDb, subDomainTransaction, errorHandler, loggers } = d;
  const db = subDomainDb.models;

  return async (args: Input): Promise<returningSuccessObj<Model<backendSiteDesignerPageSectionLoud> | null>> => {
    const { pageId, ...updateFields } = args;

    try {
      const [instance, created] = await db.backendSiteDesignerPageSectionLoud.findOrCreate({
        where: { pageId },
        defaults: updateFields,
        returning: true,
        transaction: subDomainTransaction,
      });

      // If not created, update the existing instance
      if (!created) {
        await instance.update(updateFields, { transaction: subDomainTransaction });
      }

      return {
        success: true,
        data: instance,
      };
    } catch (error) {
      errorHandler(error, loggers);
      return {
        success: false,
        data: null,
      };
    }
  };
}
