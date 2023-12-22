import { Model, Op } from "sequelize";
import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePageSectionLoud from "../../../../../../../models/subDomain/client/site/clientSitePageSectionLoud.model";

type Input = {
  pageId: string;
  id?: string;
  webAssetImport?: string;
  userAnswersJsonB?: string;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
};

export default function upsertOne(d: dependencies) {
  const { subDomainDb, subDomainTransaction, errorHandler, loggers } = d;
  const db = subDomainDb.models;

  return async (args: Input): Promise<returningSuccessObj<Model<clientSitePageSectionLoud> | null>> => {
    const { pageId, ...updateFields } = args;

    try {
      const [instance, created] = await db.clientSitePageSectionLoud.findOrCreate({
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
