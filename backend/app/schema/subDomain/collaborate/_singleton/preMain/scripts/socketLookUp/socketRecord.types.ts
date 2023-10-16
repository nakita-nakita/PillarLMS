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
    email?: string
    firstName?: string
    lastName?: string
    username?: string
    picture?: string
    callByType?: CallByTypeEnum
    circleColor?: string
    labelColor?: string

    //displayName - for already process update.
    displayName?: string,

    //sameDoc - for unsubscribing when socket disconnects
    entities?: string[],

    //meeting
    meetingId?: string,

    // sometimes id is userId depending on display context
    id?: string
}