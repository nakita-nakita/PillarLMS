import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePageSectionNormal from "../../../../../../../models/subDomain/client/site/clientSitePageSectionNormal.model";

type input = {
  id: string;
};

export default function getOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<clientSitePageSectionNormal> | null>> => {
    const { id } = args;

    const data = await db.clientSitePageSectionNormal.findByPk(id, {
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    return {
      success: true,
      data: data ? data : null,
    };
  };
}
