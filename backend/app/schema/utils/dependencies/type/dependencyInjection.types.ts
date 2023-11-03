import { Transaction } from "sequelize"
import { Sequelize } from "sequelize-typescript"

export type dependencies = {
  //domain
  domainDb?: Sequelize,
  domainTransaction?: Transaction,

  // sub domain
  subDomainDb?: Sequelize,
  subDomainTransaction?: Transaction,
  
  // error handling
  errorHandler?: Function
  loggers?: any[]

}


