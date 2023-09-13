import { Op, Transaction } from "sequelize";
import { WhereOptions, ModelCtor, Model } from "sequelize";
import backendPermission from "../../../../models/subDomain/backend/permission/backendPermission.model";
import { dObj } from "../../types/dependencyInjection.types";
import { returningSuccessObj } from "../../types/returningObjs.types";

export default function makeSetList({ errorHandler, loggers, }: dObj) {

  return async ({ dbEntity, setArray, currentDbArray, transaction }: { dbEntity: ModelCtor<Model<any, any>>, setArray: any[], currentDbArray: Model<any>[], transaction: Transaction }): Promise<returningSuccessObj<null>> => {

    const deleteList: string[] = currentDbArray.filter((currentArr) => {
      for (let i = 0; i < setArray.length; i++) {
        const arr = setArray[i];

        if (arr.id == currentArr.dataValues.id) {
          return false
        }
      }
      return true;
    }).map(currentArr => currentArr.dataValues.id);

    if (setArray.length) {
      await dbEntity.bulkCreate(
        setArray,
        {
          updateOnDuplicate: ["id"],
          transaction,
        }
      ).catch(error => errorHandler(error, loggers))
    }

    if (deleteList.length) {
      await dbEntity.destroy({
        where: {
          id: {
            [Op.in]: deleteList
          }
        },
        transaction,
      }).catch(error => errorHandler(error, loggers))
    }

    return {
      success: true,
    }
  }
}