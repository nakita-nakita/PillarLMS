import { Model } from "sequelize";
import backendSiteDesignerDiscussionVote from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionVote.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { backendSiteDesignerDiscussionVoteEnum, convertNumberToVote, convertVoteToNumber } from "./_utils.private";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  discussionId: string
  userId: string
  vote: backendSiteDesignerDiscussionVoteEnum
}

export default function setMyVote(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ discussionId, userId, vote }: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionVote> | null>> => {

    let data: Model<backendSiteDesignerDiscussionVote>;
    const voteNumber = convertVoteToNumber(vote);

    const record = await db.backendSiteDesignerDiscussionVote.findOne({
      where: {
        discussionId,
        userId,
      },
      transaction: d.subDomainTransaction,

    }).catch(error => d.errorHandler(error, d.loggers))

    if (record) {
      data = await db.backendSiteDesignerDiscussionVote.update(
        { vote: voteNumber },
        {
          where: {
            discussionId,
            userId,
          },
          returning: true,
          transaction: d.subDomainTransaction,
        }
      ).catch(error => d.errorHandler(error, d.loggers))

      data = data[0] !== 0 ? data[1][0] : null

    } else {

      data = await db.backendSiteDesignerDiscussionVote.create({
        discussionId,
        userId,
        vote: voteNumber
      }, {
        returning: true,
        transaction: d.subDomainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))
    }

    return {
      success: true,
      data,
    }
  }
}