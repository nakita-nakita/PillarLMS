import { Model } from "sequelize";
import backendSiteDesigner_discussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussion.model";
import sequelizeErrorHandler from "../../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionSql from "../../../preMain/backendSiteDesigner_discussion.sql";

type input = {
  title: string
  post: string
  userId: string
}

export default function addOne({ subDomainDb, errorHandler, transaction, loggers }: d_sub) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesigner_discussion> | null>> => {

    const d = {
      subDomainDb,
      errorHandler: sequelizeErrorHandler,
      transaction,
      loggers: [console],
    }
    const discussionSql = makeBackendSiteDesignerDiscussionSql(d);
    
    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await discussionSql.addOne({
      post: args.post,
      title: args.title,
      userId: args.userId,
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}
