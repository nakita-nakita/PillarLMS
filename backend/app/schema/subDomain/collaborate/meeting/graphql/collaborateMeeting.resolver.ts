import { Sequelize } from "sequelize-typescript";
import emptyTestSubdomainDb from "../../../../../models/subDomain/_test/emptyTestDb";
import graphqlError from "../../../../utils/errorHandling/handers/graphql.errorhandler";
import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain } from "../../../../utils/types/dependencyInjection.types";
import emptyTestDomainDb from "../../../../../models/domain/_test/emptyTestDb";
import makeCollaborateMeetingMain from "../main/collaborateMeeting.main";
// import makeBackendPermissionMain from "../main/backendPermission.main";

const makeDObj = async (): Promise<d_allDomain> => {
  const subDomainDb: Sequelize = await emptyTestSubdomainDb();
  const subDomainTransaction = await subDomainDb.transaction();
  const domainDb = await emptyTestDomainDb()
  const domainTransaction = await domainDb.transaction();

  return {
    domainDb,
    domainTransaction,
    subDomainDb,
    subDomainTransaction,
    loggers: [console],
    errorHandler: sequelizeErrorHandler
  }
}

const backendMeetingGqlResolver = {
  Query: {
    collaborateMeeting_getAllMeetings: async (parent, args, context) => {

      const d = await makeDObj()
      const main = makeCollaborateMeetingMain(d)

      const response = await main.getAllMeetings()

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    collaborateMeeting_getMeetingById: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeCollaborateMeetingMain(d)

      const response = await main.getMeetingById({
        id: args.id,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    collaborateMeeting_getMeetingsForUrl: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeCollaborateMeetingMain(d)

      const response = await main.getMeetingsForUrl({
        url: args.url,
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    collaborateMeeting_getUsersForMeeting: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeCollaborateMeetingMain(d)

      const response = await main.getUsersForMeeting({
        id: args.id
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
    collaborateMeeting_getOnlineUsersNotInMeeting: async (parent, args, ctx) => {

      const d = await makeDObj()
      const main = makeCollaborateMeetingMain(d)

      const response = await main.getOnlineUsersNotInMeeting({
        id: args.id
      })

      if (response?.success) {
        d.domainTransaction.commit()
        d.subDomainTransaction.commit()
        return response.data

      } else {
        d.domainTransaction.rollback()
        d.subDomainTransaction.rollback()
        return graphqlError(response)
      }
    },
  },
};

export default backendMeetingGqlResolver