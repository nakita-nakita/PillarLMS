import connectToDomainTestDb from "./database/domain.test.db";
import connectToSubDomainTestDb from "./database/subDomain.test.db";
import errorHandler from "./errorHandling/handers/errorHandler";
import { dependencies } from "./type/dependencyInjection.types";
import { Sequelize } from "sequelize-typescript";

export const makeDTestObj = async (): Promise<dependencies> => {
  const domainDb: Sequelize = await connectToDomainTestDb();
  const subDomainDb: Sequelize = await connectToSubDomainTestDb();

  return {
    //database
    domainDb,
    subDomainDb,

    //handling errors
    errorHandler,
    loggers: [console],

  }
}
