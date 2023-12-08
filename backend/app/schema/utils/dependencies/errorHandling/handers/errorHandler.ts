import { returningSuccessObj } from "../../../types/returningObjs.types";


// add stack-trace later when expanding to winston or something... 
export default function errorHandler(error: returningSuccessObj<any>, loggers?: typeof console[] | any[]) {

  if (!loggers) {
    console.log(error);
  } else {
    loggers.map(logger => {


      if (logger.log) {
        return logger.log(error)
      }
    })
  }

  return null
}
