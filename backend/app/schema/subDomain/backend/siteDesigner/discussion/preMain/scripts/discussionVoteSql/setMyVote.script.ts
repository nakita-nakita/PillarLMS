import sequelize from "sequelize";
import { Model } from "sequelize";
import backendSiteDesigner_discussionVote from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussionVote.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { backendSiteDesignerDiscussionVoteEnum, convertNumberToVote, convertVoteToNumber } from "./_utils.private";

type input = {
  discussionId: string
  userId: string
  vote: backendSiteDesignerDiscussionVoteEnum
}

export default function setMyVoteForDiscussion({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async ({ discussionId, userId, vote }: input): Promise<returningSuccessObj<backendSiteDesignerDiscussionVoteEnum | null>> => {

    let data: Model<backendSiteDesigner_discussionVote>;
    const voteNumber = convertVoteToNumber(vote);

    const record = await db.backendSiteDesigner_discussionVote.findOne({
      where: {
        discussionId,
        userId,
      },
      transaction: subDomainTransaction,

    }).catch(error => errorHandler(error, loggers))

    if (record) {
      data = await db.backendSiteDesigner_discussionVote.update(
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

      data = await db.backendSiteDesigner_discussionVote.create({
        discussionId,
        userId,
        vote: voteNumber
      }, {
        transaction: subDomainTransaction,
      }).catch(error => errorHandler(error, loggers))
    }

    return {
      success: true,
      data: convertNumberToVote(data?.dataValues?.vote)
    }
  }
}