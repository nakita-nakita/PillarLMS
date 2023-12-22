import { Op, Transaction } from "sequelize";
import { returningSuccessObj } from "../../types/returningObjs.types";
import { dependencies } from "../../dependencies/type/dependencyInjection.types";
import { Model, ModelCtor } from "sequelize-typescript";



export default function makeSetList<Type>(d: dependencies) {

  type input = {
    dbEntity: any,
    // dbEntity: ModelCtor<Model<any, any>>,
    setArray: any[],
    currentDbArray: any,
    // currentDbArray: Model<any>[],
    transaction: Transaction
  }

  return async ({ dbEntity, setArray, currentDbArray, transaction }: input): Promise<returningSuccessObj<null>> => {

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
      ).catch(error => d.errorHandler(error, d.loggers))
    }

    if (deleteList.length) {
      await dbEntity.destroy({
        where: {
          id: {
            [Op.in]: deleteList
          }
        },
        transaction,
      }).catch(error => d.errorHandler(error, d.loggers))
    }

    return {
      success: true,
    }
  }
}