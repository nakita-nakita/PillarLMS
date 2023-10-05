import { Model } from "sequelize";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSiteDesignerDiscussionCommentVote from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionCommentVote.model";

type input = {
  commentId: string,
  userId: string,
}

export default function getMyVote({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionCommentVote> | null>> => {

    const data: Model<backendSiteDesignerDiscussionCommentVote> = await db.backendSiteDesignerDiscussionCommentVote.findOne({
      where,
      transaction: subDomainTransaction,
    }).catch(errorHandler)

    return {
      success: true,
      data,
    }
  }
}