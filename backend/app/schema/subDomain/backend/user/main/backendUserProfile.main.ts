import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import deactivateOne from "./scripts/profileMain/deactivateOne.script"
import getOneById from "./scripts/profileMain/getOneById.script"
import reactivateOne from "./scripts/profileMain/reactivateOne.script"
import updateOne from "./scripts/profileMain/updateOne.script"

export default function makeBackendUserProfileMain(d: dependencies) {

  return {
    deactivateOne: deactivateOne(d),
    reactivateOne: reactivateOne(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}