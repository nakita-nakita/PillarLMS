import { Model } from "sequelize";
import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
  title?: string
  post?: string
  userId?: string
}

export default function updateOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussion> | null>> => {

    const data = await db.backendSiteDesignerDiscussion.update(
      {
        ...args,
        hasBeenEdited: true,
      },
      {
        where: { id, },
        returning: true,
        transaction: d.subDomainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


