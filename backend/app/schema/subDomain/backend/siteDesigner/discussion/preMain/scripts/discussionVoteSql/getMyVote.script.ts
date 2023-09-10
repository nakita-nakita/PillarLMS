import sequelize from "sequelize";
import { Model } from "sequelize";
import backendSiteDesigner_discussionVote from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussionVote.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { backendSiteDesignerDiscussionVoteEnum, convertNumberToVote } from "./_utils.private";

type input = {
  discussionId: string,
  userId: string,
}

export default function getMyVoteForDiscussion({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<backendSiteDesignerDiscussionVoteEnum>> => {

    const data : Model<backendSiteDesigner_discussionVote> = await db.backendSiteDesigner_discussionVote.findOne({
        where,
        transaction,
    }).catch(errorHandler)

    return {
      success: true,
      data: convertNumberToVote(data?.dataValues.vote)
    }
  }
}