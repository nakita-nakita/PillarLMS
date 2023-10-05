import { Model } from "sequelize";
import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { sequelize } from "../../../../../../../../models/domain";

type input = { 
  id: string 
}

export default function getOneById({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussion> | null>> => {

    const data = await db.backendSiteDesignerDiscussion.findOne({
      where,
      
      attributes: [
        ...Object.keys(db.backendSiteDesignerDiscussion.rawAttributes),
        [sequelize.fn('COALESCE', sequelize.literal('(SELECT SUM("backendSiteDesignerDiscussionVote"."vote") FROM "backendSiteDesignerDiscussionVote" WHERE "backendSiteDesignerDiscussionVote"."discussionId" = "backendSiteDesignerDiscussion"."id")'), 0), 'voteTotal'],
        [sequelize.fn('COALESCE', sequelize.literal('(SELECT COUNT("backendSiteDesignerDiscussionComment"."id") FROM "backendSiteDesignerDiscussionComment" WHERE "backendSiteDesignerDiscussionComment"."discussionId" = "backendSiteDesignerDiscussion"."id" AND "backendSiteDesignerDiscussionComment"."deletedAt" IS NULL) '), 0), 'commentsCount']
      ],
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}