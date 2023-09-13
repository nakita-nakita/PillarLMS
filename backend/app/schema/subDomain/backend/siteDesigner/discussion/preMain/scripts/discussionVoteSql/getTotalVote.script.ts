import sequelize from "sequelize"
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types"
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types"

type input = {
  discussionId: string
}

export default function getTotalVoteForDiscussion({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<number | null>> => {

    const data = await db.backendSiteDesigner_discussionVote.findOne({
      attributes: [
        [sequelize.fn('sum', sequelize.col('vote')), 'voteTotal']
      ],
      where,
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data.dataValues.voteTotal ? parseInt(data.dataValues.voteTotal) : 0,
    }
  }
}