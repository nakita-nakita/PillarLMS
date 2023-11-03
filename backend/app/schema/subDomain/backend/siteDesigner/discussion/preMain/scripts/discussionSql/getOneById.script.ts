import { Model } from "sequelize";
import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { sequelize } from "../../../../../../../../models/domain";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { 
  id: string 
}

export default function getOneById(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussion> | null>> => {

    const data = await db.backendSiteDesignerDiscussion.findOne({
      where,
      
      attributes: [
        ...Object.keys(db.backendSiteDesignerDiscussion.rawAttributes),
        [sequelize.fn('COALESCE', sequelize.literal('(SELECT SUM("backendSiteDesignerDiscussionVote"."vote") FROM "backendSiteDesignerDiscussionVote" WHERE "backendSiteDesignerDiscussionVote"."discussionId" = "backendSiteDesignerDiscussion"."id")'), 0), 'voteTotal'],
        [sequelize.fn('COALESCE', sequelize.literal('(SELECT COUNT("backendSiteDesignerDiscussionComment"."id") FROM "backendSiteDesignerDiscussionComment" WHERE "backendSiteDesignerDiscussionComment"."discussionId" = "backendSiteDesignerDiscussion"."id" AND "backendSiteDesignerDiscussionComment"."deletedAt" IS NULL) '), 0), 'commentsCount']
      ],
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}