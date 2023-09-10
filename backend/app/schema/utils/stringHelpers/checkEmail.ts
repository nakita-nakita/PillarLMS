import { returningSuccessObj } from '../types/returningObjs.types';

const re =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type isStringValidEmail_input = {
  str: string
}

export const isStringValidEmail = ({ str }: isStringValidEmail_input): returningSuccessObj<null> => {

  const result = re.test(String(str).toLowerCase())

  return {
    success: true,
    result,
  }
}

type areStringsValidEmails_input = {
  strArr: string[]
}

export const areStringsValidEmails = ({ strArr }: areStringsValidEmails_input): returningSuccessObj<null> => {
  for (let i = 0; i < strArr.length; i++) {
    const str = strArr[i];

    if (!re.test(String(str).toLowerCase())) {
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
  isStringValidEmail,
  areStringsValidEmails,
}