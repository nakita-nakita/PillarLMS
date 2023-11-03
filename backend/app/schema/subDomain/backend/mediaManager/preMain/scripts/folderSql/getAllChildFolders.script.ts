import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import backendMediaManagerFolder from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFolder.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

type output = {
  id: string
  name: string
  order: number
}

export default function getAllChildFolders(d: dependencies) {

  const db = d.subDomainDb.models;

  async function fetchChildFolders(folderId: string, depth: number = 0): Promise<output[]> {
    const childFolders: Model<backendMediaManagerFolder>[] = await db.backendMediaManagerFolder.findAll({
      where: { folderId },
      transaction: d.subDomainTransaction,
      paranoid: false
    }).catch(error => d.errorHandler(error, d.loggers));

    let results: output[] = [];
    
    for (const child of childFolders) {
      results.push({
        id: child.dataValues.id,
        name: child.dataValues.name,
        order: depth,
      });

      const grandChildren = await fetchChildFolders(child.dataValues.id, depth + 1);
      results = results.concat(grandChildren);
    }

    return results;
  }

  return async (args: input): Promise<returningSuccessObj<output[]>> => {
    const data = await fetchChildFolders(args.id);
    return {
      success: true,
      data,
    }
  }
}
