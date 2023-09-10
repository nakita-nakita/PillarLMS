import { returningSuccessObj } from '../types/returningObjs.types';

type input = {
  str: string
  length: number
}

export const isStringLengthLessThan = ({ str, length, }: input): returningSuccessObj<null> => {
  return {
    success: true,
    result: str.length < length,
  }
}

type manyInput = {
  strArr: string[]
  length: number
}

export const areStringsLengthLessThan = ({ strArr, length, }: manyInput): returningSuccessObj<null> => {
  for (let i = 0; i < strArr.length; i++) {
    const str = strArr[i];

    if (str.length > length) {
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
  isStringLengthLessThan,
  areStringsLengthLessThan,
}