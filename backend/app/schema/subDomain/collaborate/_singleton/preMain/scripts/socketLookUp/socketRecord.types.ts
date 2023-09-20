import { CallByTypeEnum } from "../../../../../../domain/foundation/user/preMain/scripts/foundationUserProfileSql/upsertOne.script"


export type socketLookUpType = {
    //socket connection per tab
    socketId: string,
    socket: any,

    // is user focus on that tab?
    isTabFocus?: boolean,

    //location
    asPath?: string, //with params
    pathname?: string, // without params

    //user
    userId: string,
    email?: String
    firstName?: String
    lastName?: String
    username?: String
    picture?: String
    callByType?: CallByTypeEnum
    circleColor?: String
    labelColor?: String

    //meeting
    meetingId?: string,

    // sometimes id is userId depending on display context
    id?: string
}