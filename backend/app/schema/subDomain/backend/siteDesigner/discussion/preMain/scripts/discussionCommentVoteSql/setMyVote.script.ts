import sequelize from "sequelize";
import { Model } from "sequelize";
import backendSiteDesignerDiscussionCommentVote from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionCommentVote.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { backendSiteDesignerDiscussionVoteEnum, convertVoteToNumber } from "../discussionVoteSql/_utils.private";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  commentId: string
  userId: string
  vote: backendSiteDesignerDiscussionVoteEnum
}

export default function setMyVote(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ commentId, userId, vote }: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionCommentVote> | null>> => {

    let data: Model<backendSiteDesignerDiscussionCommentVote>;
    const voteNumber = convertVoteToNumber(vote);

    const record = await db.backendSiteDesignerDiscussionCommentVote.findOne({
      where: {
        commentId,
        userId,
      },
      transaction: d.subDomainTransaction,

    }).catch(error => d.errorHandler(error, d.loggers))

    if (record) {
      data = await db.backendSiteDesignerDiscussionCommentVote.update(
        { vote: voteNumber },
        {
          where: {
            commentId,
            userId,
          },
          returning: true,
          transaction: d.subDomainTransaction,
        }
      ).catch(error => d.errorHandler(error, d.loggers))

      data = data[0] !== 0 ? data[1][0] : null

    } else {

      data = await db.backendSiteDesignerDiscussionCommentVote.create({
        commentId,
        userId,
        vote: voteNumber
      }, {
        transaction: d.subDomainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))
    }

    return {
      success: true,
      data,
    }
  }
}