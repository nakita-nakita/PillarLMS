import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import updateSwitchChange from "./scripts/Switch/updateSwitchChange.script";

export default function makeCollaborateSameDocSwitch(d: dependencies) {
  return {
    updateSwitchChange: updateSwitchChange(d)
  }
}