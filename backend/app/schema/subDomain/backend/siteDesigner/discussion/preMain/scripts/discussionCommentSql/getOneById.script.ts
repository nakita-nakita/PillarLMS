import { Model } from "sequelize";
import backendSiteDesigner_discussionComment from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussionComment.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

type input = { 
  id: string 
}

export default function getOneById({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendSiteDesigner_discussionComment> | null>> => {

    const data = await db.backendSiteDesigner_discussionComment.findOne({
      where,
      transaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}