import sequelize from "sequelize";
import { FindAndCountOptions, Op } from "sequelize";
import backendSiteDesignerDiscussion from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";

export enum backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum {
  // HOT = "HOT",
  TOP = "TOP",
  NEW = "NEW",
}

type input = {
  page?: number
  pageSize?: number
  type: backendSiteDesignerDiscussion_getManyWithPaginationTypeEnum
}

export default function getManyWithPagination({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesignerDiscussion>>> => {
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
      order: [['createdAt', 'ASC']],
      attributes: [
        ...Object.keys(db.backendSiteDesignerDiscussion.rawAttributes),
        [sequelize.fn('COALESCE', sequelize.literal('(SELECT SUM("backendSiteDesignerDiscussionVote"."vote") FROM "backendSiteDesignerDiscussionVote" WHERE "backendSiteDesignerDiscussionVote"."discussionId" = "backendSiteDesignerDiscussion"."id")'), 0), 'voteTotal'],
        [sequelize.fn('COALESCE', sequelize.literal('(SELECT COUNT("backendSiteDesignerDiscussionComment"."id") FROM "backendSiteDesignerDiscussionComment" WHERE "backendSiteDesignerDiscussionComment"."discussionId" = "backendSiteDesignerDiscussion"."id" AND "backendSiteDesignerDiscussionComment"."deletedAt" IS NULL) '), 0), 'commentsCount']
      ]
    };

    if (type === "NEW") {
      search.order = sequelize.literal('"createdAt" DESC')
    }

    if (type === "TOP") {
      search.order = sequelize.literal('"voteTotal" DESC')
    }

    const data: findAndCountAll<backendSiteDesignerDiscussion> = await db.backendSiteDesignerDiscussion.findAndCountAll(search);
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


