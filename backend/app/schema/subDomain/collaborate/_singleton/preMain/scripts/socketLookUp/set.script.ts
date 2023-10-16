import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { socketLookUpType } from "./socketRecord.types";
import makeSingleton from "../../_singleton.ram-cache";



export default function set(d: d_allDomain) {

  const getDisplayName = ({ callByType, email, username, firstName, lastName }) => {
    switch (callByType) {
      case "EMAIL":
        return email

      case "USERNAME":
        return username

      case "FIRST_NAME":
        return firstName

      case "LAST_NAME":
        return lastName

      case "FULL_NAME":
        return `${firstName} ${lastName}`
      default:
        return email
    }
  }

  return async (args: socketLookUpType): Promise<returningSuccessObj<socketLookUpType[]>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }
    
    args.entities = args.entities || [],

    args.displayName = getDisplayName({
      callByType: args.callByType,
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      username: args.username,
    })

    singleton.data.socketLookUp.push(args)

    return {
      success: true,
      data: singleton.data.socketLookUp
    }
  }
}


