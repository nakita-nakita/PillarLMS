import connectToDomainDb from "./database/domain.db";
import connectToSubDomainDb from "./database/subDomain.db";
import errorHandler from "./errorHandling/handers/errorHandler";
import { dependencies } from "./type/dependencyInjection.types";
import { Sequelize } from "sequelize-typescript";

export const makeDObj = async (): Promise<dependencies> => {
  const domainDb: Sequelize = await connectToDomainDb();
  const subDomainDb: Sequelize = await connectToSubDomainDb();

  return {
    //database
    domainDb,
    subDomainDb,

    //handling errors
    errorHandler,
    loggers: [console],

  }
}
