import { Model } from "sequelize";
import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

export enum notificationIconEnum {
  DISCUSSION = "DISCUSSION",
  SYSTEM = "SYSTEM",
  MEETING = "MEETING",
}

export type notificationUrlQueryType = {
  key: string,
  value: string,
}

export enum notificationTypeEnum {
  URL = "URL",
  MEETING = "MEETING"
}

export type notificationDataType = {
  url?: string,
  urlQuery?: notificationUrlQueryType[]
  meetingId?: string,
}

export type notificationAction = {
  type: notificationTypeEnum,
  icon: notificationIconEnum,
  data: notificationDataType 
}

type input = {
  message: string
  hasBeenSeen?: boolean
  hasBeenClicked?: boolean
  action: notificationAction
  userId: string
}

// type: sequelize.ENUM("SYSTEM", "DISCUSSION"),

export default function addOne(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendNotification>>> => {

    const obj = {
      message: args.message,
      hasBeenSeen: args.hasBeenSeen,
      hasBeenClicked: args.hasBeenClicked,
      action: JSON.stringify(args.action),
      userId: args.userId,
    }

    const data = await db.backendNotification.create(
      obj,
      {
        transaction: d.subDomainTransaction,
        returning: true,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


