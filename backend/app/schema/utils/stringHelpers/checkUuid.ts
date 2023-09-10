import { isUuid } from 'uuidv4';
import { returningSuccessObj } from '../types/returningObjs.types';

export const isStringValidUuid = ({ str }): returningSuccessObj<null> => {
  const result = isUuid(str)

  return {
    success: true,
    result,
  }
}

export const areStringsValidUuids = ({ strArr }): returningSuccessObj<null> => {
  for (let i = 0; i < strArr.length; i++) {
    const str = strArr[i];

    if (!isUuid(str)) {
      return {
        success: true,
        result: false,
      }
    }
  }

  return {
    success: true,
    result: true,
  }

}

export default {
  isStringValidUuid,
  areStringsValidUuids,
}