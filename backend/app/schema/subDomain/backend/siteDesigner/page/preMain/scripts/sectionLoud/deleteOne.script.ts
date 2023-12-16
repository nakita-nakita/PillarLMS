import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type Input = {
  id: string;
};

export default function deleteOne(d: dependencies) {
  const { subDomainDb, subDomainTransaction, errorHandler, loggers } = d;
  const db = subDomainDb.models;

  return async (args: Input): Promise<returningSuccessObj<null>> => {
    const { id } = args;

    try {
      const instance = await db.backendSiteDesignerPageSectionLoud.findByPk(id, {
        transaction: subDomainTransaction,
      });

      if (instance) {
        await instance.destroy({ transaction: subDomainTransaction });

        return {
          success: true,
          data: null, // No data to return after deletion
        };
      } else {
        return {
          success: false,
          data: null,
        };
      }
    } catch (error) {
      errorHandler(error, loggers);
      return {
        success: false,
        data: null,
      };
    }
  };
}
