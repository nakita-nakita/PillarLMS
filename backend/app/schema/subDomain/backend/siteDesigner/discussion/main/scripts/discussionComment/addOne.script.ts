import { Model } from "sequelize";
import backendSiteDesigner_discussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussion.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionSql from "../../../preMain/backendSiteDesigner_discussion.sql";
import makeBackendSiteDesignerDiscussionCommentSql from "../../../preMain/backendSiteDesigner_discussionComment.sql";

type input = {
  post: string
  userId: string
  discussionId: string
}

export default function addOne({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesigner_discussion> | null>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const discussionSql = makeBackendSiteDesignerDiscussionCommentSql(d);
    
    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await discussionSql.addOne({
      post: args.post,
      discussionId: args.discussionId,
      userId: args.userId,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}
