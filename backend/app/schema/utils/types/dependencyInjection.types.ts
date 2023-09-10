import { Model, Transaction } from "sequelize"
import { Sequelize } from "sequelize-typescript"

type dObj = {
  errorHandler: any,
  loggers: any[],
  transaction?: Transaction
}

export interface d_sub extends dObj {
  subDomainDb: Sequelize,
}

// export interface d_sub_test extends dObj {
//   subDomainDb: Sequelize,
//   testMode: boolean
// }

export interface d_domain extends dObj {
  domainDb: Sequelize,
}

// export interface d_domain_test extends dObj {
//   domainDb: Sequelize,
//   testMode: boolean
// }

export interface d_allDomain extends dObj {
  domainDb: Sequelize,
  subDomainDb: Sequelize,

  subDomaintransaction: Transaction,
  domainTransaction: Transaction,
}

// export interface d_allDomain_test extends dObj {
//   domainDb: Sequelize,
//   subDomainDb: Sequelize,
//   testMode: boolean,
// }

export interface d extends dObj {
  dbEntity?: Model<any>,
  domainDb?: Sequelize,
  subDomainDb?: Sequelize,
  testMode?: boolean,
}
