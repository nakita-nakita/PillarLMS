import { FindAndCountOptions, Op } from "sequelize";
import sequelize from "sequelize";
import { Model } from "sequelize-typescript";
import backendSiteDesignerDiscussionComment from "../../../../../../../../models/subDomain/backend/siteDesigner/discussion/backendSiteDesignerDiscussionComment.model";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../../utils/types/sequelize.types";

type input = {
  discussionId: string
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<findAndCountAll<backendSiteDesignerDiscussionComment>>> => {
    let { q, page, pageSize, } = args

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
      where: {
        discussionId: args.discussionId,
      },
      offset: page * pageSize,
      limit: pageSize,
      transaction: subDomainTransaction,
      order: [['createdAt', 'ASC']],
      attributes: [
        ...Object.keys(db.backendSiteDesignerDiscussionComment.rawAttributes),
        [sequelize.fn('COALESCE', sequelize.literal('(SELECT SUM("backendSiteDesignerDiscussionCommentVote"."vote") FROM "backendSiteDesignerDiscussionCommentVote" WHERE "backendSiteDesignerDiscussionCommentVote"."commentId" = "backendSiteDesignerDiscussionComment"."id")'), 0), 'voteTotal'],
      ]
    };

    if (q) {
      search = {
        where: {
          name: {
            [Op.like]: "%" + q + "%",
          },
        },
      }
    }


    let data: findAndCountAll<backendSiteDesignerDiscussionComment> = await db.backendSiteDesignerDiscussionComment.findAndCountAll(search).catch(error => errorHandler(error, loggers))
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


