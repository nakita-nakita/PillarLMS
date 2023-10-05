import sequelize from "sequelize";
import { Model } from "sequelize";
import backendSiteDesignerDiscussionCommentVote from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionCommentVote.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { backendSiteDesignerDiscussionVoteEnum, convertVoteToNumber } from "../discussionVoteSql/_utils.private";

type input = {
  commentId: string
  userId: string
  vote: backendSiteDesignerDiscussionVoteEnum
}

export default function setMyVote({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ commentId, userId, vote }: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionCommentVote> | null>> => {

    let data: Model<backendSiteDesignerDiscussionCommentVote>;
    const voteNumber = convertVoteToNumber(vote);

    const record = await db.backendSiteDesignerDiscussionCommentVote.findOne({
      where: {
        commentId,
        userId,
      },
      transaction: subDomainTransaction,

    }).catch(error => errorHandler(error, loggers))

    if (record) {
      data = await db.backendSiteDesignerDiscussionCommentVote.update(
        { vote: voteNumber },
        {
          where: {
            commentId,
            userId,
          },
          returning: true,
          transaction: subDomainTransaction,
        }
      ).catch(error => errorHandler(error, loggers))

      data = data[0] !== 0 ? data[1][0] : null

    } else {

      data = await db.backendSiteDesignerDiscussionCommentVote.create({
        commentId,
        userId,
        vote: voteNumber
      }, {
        transaction: subDomainTransaction,
      }).catch(error => errorHandler(error, loggers))
    }

    return {
      success: true,
      data,
    }
  }
}