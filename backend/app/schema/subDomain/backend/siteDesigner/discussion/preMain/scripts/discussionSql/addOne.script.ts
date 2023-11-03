import { Model } from "sequelize";
import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  title: string
  post: string
  userId: string
}

export default function addOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussion> | null>> => {

    const data = await db.backendSiteDesignerDiscussion.create(
      args,
      {
        transaction: d.subDomainTransaction,
        returning: true,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


