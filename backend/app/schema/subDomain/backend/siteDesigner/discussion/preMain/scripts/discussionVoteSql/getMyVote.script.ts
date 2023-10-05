import { Model } from "sequelize";
import backendSiteDesignerDiscussionVote from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionVote.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { backendSiteDesignerDiscussionVoteEnum, convertNumberToVote } from "./_utils.private";

type input = {
  discussionId: string,
  userId: string,
}

export default function getMyVote({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionVote> | null>> => {

    const data : Model<backendSiteDesignerDiscussionVote> = await db.backendSiteDesignerDiscussionVote.findOne({
        where,
        transaction: subDomainTransaction,
    }).catch(errorHandler)

    return {
      success: true,
      data,
    }
  }
}