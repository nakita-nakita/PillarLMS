
export default function sequelizeErrorHandler(error: Error, loggers: typeof console[] | any[]) {
  loggers.map(logger => {
    if (logger.error) {
      return logger.error(error.message)
    }

    if (logger.log) {
      return logger.log(error.message)
    }
  })

  return null
}
