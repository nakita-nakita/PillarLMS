import { Sequelize } from "sequelize-typescript";
import emptyTestDomainDb from "../../models/domain/_test/emptyTestDb";
import makeFoundationAuthFunc from "../../schema/domain/foundation/auth/preMain/foundationAuth.func";
import sequelizeErrorHandler from "../../schema/utils/errorHandling/handers/sequelize.errorHandler";
import { d_domain } from "../../schema/utils/types/dependencyInjection.types";

const makeDomainDObj = async (): Promise<d_domain> => {
  const domainDb: Sequelize = await emptyTestDomainDb();
  const transaction = await domainDb.transaction();

  return {
    domainDb,
    transaction,
    loggers: [console],
    errorHandler: sequelizeErrorHandler,
  }
}

const isAuthenticated = async (req, res, next) => {
  const bearerToken = req.get("Authorization") || req.get("authorization");
  const token = bearerToken.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized."
    })
  }

  const d = await makeDomainDObj()
  const authFunc = makeFoundationAuthFunc(d)
  let userId;

  try {
     userId = (await authFunc.getDataFromToken({ token })).data.userId

  } catch (error) {

  }
  console.log('token')
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized."
    })
  }

  req.user = req.user || {};
  req.user.id = userId

  return next()
}

const uploaderAuth = {
  isAuthenticated,
}

export default  uploaderAuth