import { Model } from "sequelize";
import backendSiteDesigner_discussionComment from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussionComment.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

type input = {
  id: string
  post?: string
}

export default function updateOne({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<backendSiteDesigner_discussionComment> | null>> => {

    const data = await db.backendSiteDesigner_discussionComment.update(
      {
        ...args,
        hasBeenEdited: true,
      },
      {
        where: { id, },
        returning: true,
        transaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}