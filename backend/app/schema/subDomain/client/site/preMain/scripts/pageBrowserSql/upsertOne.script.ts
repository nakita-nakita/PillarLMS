import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePageBrowser from "../../../../../../../models/subDomain/client/site/clientSitePageBrowser.model";

type input = {
  pageId: string;
  id?: string;
  tabName?: string;
};

export default function upsertOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (
    args: input
  ): Promise<returningSuccessObj<Model<clientSitePageBrowser> | null>> => {
    try {
      let instance = await db.clientSitePageBrowser.findOne({
        where: {
          pageId: args.pageId,
        },
        transaction: d.subDomainTransaction,
      });

      if (!instance) {
        // If instance doesn't exist, create a new one
        [instance] = await db.clientSitePageBrowser.findOrCreate({
          where: {
            pageId: args.pageId,
          },
          defaults: args,
          transaction: d.subDomainTransaction,
        });
      } else {
        // If instance exists, update the existing one
        instance = await instance.update(args, {
          transaction: d.subDomainTransaction,
        });
      }

      return {
        success: true,
        data: instance,
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        humanMessage: "Error during upsert operation",
      };
    }
  };
}
