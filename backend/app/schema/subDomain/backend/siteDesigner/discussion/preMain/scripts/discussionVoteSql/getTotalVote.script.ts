import sequelize from "sequelize"
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types"
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  discussionId: string
}

export default function getTotalVote(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<number | null>> => {

    const data = await db.backendSiteDesignerDiscussionVote.findOne({
      attributes: [
        [sequelize.fn('sum', sequelize.col('vote')), 'voteTotal']
      ],
      where,
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data.dataValues.voteTotal ? parseInt(data.dataValues.voteTotal) : 0,
    }
  }
}