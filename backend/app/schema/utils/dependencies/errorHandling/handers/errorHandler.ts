import { returningSuccessObj } from "../../../types/returningObjs.types";


// add stack-trace later when expanding to winston or something... 
export default function errorHandler(error: returningSuccessObj<any>, loggers?: typeof console[] | any[]) {

  if (!loggers) {
    console.error(error);
  } else {
    loggers.map(logger => {
      if (logger.error) {
        return logger.error(error.humanMessage)
      }

      if (logger.log) {
        return logger.log(error.humanMessage)
      }
    })
  }

  return null
}
