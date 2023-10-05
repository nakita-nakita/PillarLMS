import sequelize from "sequelize";
import { Model } from "sequelize";
import backendSiteDesignerDiscussionVote from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionVote.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { backendSiteDesignerDiscussionVoteEnum, convertNumberToVote, convertVoteToNumber } from "./_utils.private";

type input = {
  discussionId: string
  userId: string
  vote: backendSiteDesignerDiscussionVoteEnum
}

export default function setMyVote({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ discussionId, userId, vote }: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionVote> | null>> => {

    let data: Model<backendSiteDesignerDiscussionVote>;
    const voteNumber = convertVoteToNumber(vote);

    const record = await db.backendSiteDesignerDiscussionVote.findOne({
      where: {
        discussionId,
        userId,
      },
      transaction: subDomainTransaction,

    }).catch(error => errorHandler(error, loggers))

    if (record) {
      data = await db.backendSiteDesignerDiscussionVote.update(
        { vote: voteNumber },
        {
          where: {
            discussionId,
            userId,
          },
          returning: true,
          transaction: subDomainTransaction,
        }
      ).catch(error => errorHandler(error, loggers))

      data = data[0] !== 0 ? data[1][0] : null

    } else {

      data = await db.backendSiteDesignerDiscussionVote.create({
        discussionId,
        userId,
        vote: voteNumber
      }, {
        returning: true,
        transaction: subDomainTransaction,
      }).catch(error => errorHandler(error, loggers))
    }

    return {
      success: true,
      data,
    }
  }
}