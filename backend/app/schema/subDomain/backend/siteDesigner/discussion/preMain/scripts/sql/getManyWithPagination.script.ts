import sequelize from "sequelize";
import { FindAndCountOptions, Op } from "sequelize";
import backendSiteDesigner_discussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesigner_discussion.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";

export enum backendSiteDesigner_discussion_getManyWithPaginationTypeEnum {
  HOT = "HOT",
  NEW = "NEW",
}

type input = {
  page?: number
  pageSize?: number
  type: backendSiteDesigner_discussion_getManyWithPaginationTypeEnum
}

export default function getManyWithPagination({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesigner_discussion>>> => {
    let { type, page, pageSize } = args
    page = page ? page - 1 : 0;
    pageSize = pageSize || 10;

    if (page < 0) {
      return {
        success: false,
        humanMessage: "Please start the page at 1."
      };
    }
    if (pageSize < 0 || pageSize >= 100) {
      return {
        success: false,
        humanMessage: "Please keep pageSize inbetween 1 - 100."
      }
    }

    let search: FindAndCountOptions = {
      offset: page * pageSize,
      limit: pageSize,
      transaction: subDomainTransaction,

      attributes: [
        ...Object.keys(db.backendSiteDesigner_discussion.rawAttributes),
        [sequelize.fn('COALESCE', sequelize.literal('(SELECT SUM("backendSiteDesigner_discussionVote"."vote") FROM "backendSiteDesigner_discussionVote" WHERE "backendSiteDesigner_discussionVote"."discussionId" = "backendSiteDesigner_discussion"."id")'), 0), 'voteTotal'],
        [sequelize.fn('COALESCE', sequelize.literal('(SELECT COUNT("backendSiteDesigner_discussionComment"."id") FROM "backendSiteDesigner_discussionComment" WHERE "backendSiteDesigner_discussionComment"."discussionId" = "backendSiteDesigner_discussion"."id")'), 0), 'commentsCount']
      ]
    };

    if (type === "NEW") {
      search.order = sequelize.literal('"createdAt" DESC')
    }

    if (type === "HOT") {
      search.order = sequelize.literal('"voteTotal" DESC')
    }

    const data: findAndCountAll<backendSiteDesigner_discussion> = await db.backendSiteDesigner_discussion.findAndCountAll(search);
    data.page = page + 1;
    data.pageSize = pageSize;
    data.pageCount = Math.ceil(
      data.count / data.pageSize
    );

    return {
      success: true,
      data,
    }
  }
}


