import { returningSuccessObj } from '../types/returningObjs.types';

type input = {
  hint?: string
  errorIdentifier?: string

}

const endMainFromError = (args?: input): returningSuccessObj<null> => {
  if (!args) {
    return {
      success: false,
      humanMessage: "Not Authorized!"
    }
  }

  const { hint, errorIdentifier } = args


  return {
    success: false,
    humanMessage: hint || "Not Authorized!",
    errorIdentifier,
  }
}

export default endMainFromError