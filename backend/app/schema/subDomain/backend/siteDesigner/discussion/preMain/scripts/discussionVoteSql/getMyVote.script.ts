import { Model } from "sequelize";
import backendSiteDesignerDiscussionVote from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionVote.model";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  discussionId: string,
  userId: string,
}

export default function getMyVote(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionVote> | null>> => {

    const data : Model<backendSiteDesignerDiscussionVote> = await db.backendSiteDesignerDiscussionVote.findOne({
        where,
        transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}