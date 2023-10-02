import { Model } from "sequelize";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import backendMediaManagerFolder from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFolder.model";

type input = {
  id: string
}

type output = {
  id: string
  name: string
  order: number
}

export default function getBreadCrumb({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<output[]>> => {

    const MAX_DEPTH = 50;
    const data : output[] = []

    let parentId = args.id
    let counter = 0

    while (parentId !== null && counter < MAX_DEPTH) {

      let result: Model<backendMediaManagerFolder> = await db.backendMediaManagerFolder.findOne({
        where: {id: parentId},
        transaction: subDomainTransaction,
        paranoid: false
      }).catch(error => errorHandler(error, loggers))
  
      data.push({
        id: result.dataValues.id,
        name: result.dataValues.name,
        order: counter,
      })

      parentId = result.dataValues.folderId,
      counter = counter + 1

    }
    
    if (counter === MAX_DEPTH) {
      return {
        success: false,
        humanMessage: "Max depth reached for breadcrumbs.",
      }
    }

    return {
      success: true,
      data,
    }
  }
}


