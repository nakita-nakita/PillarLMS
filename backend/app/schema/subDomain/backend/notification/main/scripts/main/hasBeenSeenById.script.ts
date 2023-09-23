import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendNotificationSql from "../../../preMain/backendNotification.sql";
import makeBackendNotificationValidation from "../../../preMain/backendNotification.validation";
import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import stringHelpers from "../../../../../../utils/stringHelpers";


type input = {
    id: string
  }

export default function hasBeenSeenById({ subDomainDb, errorHandler, subDomainTransaction, loggers }: d_sub) {
	return async (args: input): Promise<returningSuccessObj<Model<backendNotification> | null>> => {

		const d = {
			subDomainDb,
			errorHandler,
			subDomainTransaction,
			loggers,
		}
		const backendNotificationSql = makeBackendNotificationSql(d);
		const backendNotificationValidation = makeBackendNotificationValidation(d);

		//////////////////////////////////////
		// Validations
		// ===================================


		const isIdUuid = stringHelpers.isStringValidUuid({
			str: args.id,
		})

		if (!isIdUuid.result) {
			return endMainFromError({
				hint: "'id' is not a UUID.",
				errorIdentifier: "backendNotification_hasBeenSeenById_error:0001"
			})
		}


		//////////////////////////////////////
		// Sql
		// ===================================    

		const response = await backendNotificationSql.hasBeenSeenById({
      id: args.id
		}).catch(error => errorHandler(error, loggers))

		return response
	}
}
