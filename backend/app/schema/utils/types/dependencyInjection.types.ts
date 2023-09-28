import { createClient } from "redis"
import { Model, Transaction } from "sequelize"
import { Sequelize } from "sequelize-typescript"

export type dObj = {
  errorHandler: any,
  loggers: any[],
  // redisClient?: ReturnType<typeof createClient>

}

export interface d_sub extends dObj {
  subDomainDb: Sequelize,
  subDomainTransaction?: Transaction,
}

// export interface d_sub_test extends dObj {
//   subDomainDb: Sequelize,
//   testMode: boolean
// }

export interface d_domain extends dObj {
  domainDb: Sequelize,
  domainTransaction?: Transaction,
}

// export interface d_domain_test extends dObj {
//   domainDb: Sequelize,
//   testMode: boolean
// }

export interface d_allDomain extends dObj {
  domainDb: Sequelize,
  domainTransaction?: Transaction,
  
  subDomainDb: Sequelize,
  subDomainTransaction?: Transaction,
}

// export interface d_allDomain_test extends dObj {
//   domainDb: Sequelize,
//   subDomainDb: Sequelize,
//   testMode: boolean,
// }

// export interface d extends dObj {
//   dbEntity?: Model<any>,
//   // domainDb?: Sequelize,
//   // subDomainDb?: Sequelize,
//   transaction: Transaction,

//   testMode?: boolean,
// }
