import { d_allDomain } from "../../../../utils/types/dependencyInjection.types";
import updateSwitchChange from "./scripts/Switch/updateSwitchChange.script";

export default function makeCollaborateSameDocSwitch(d: d_allDomain) {
  return {
    updateSwitchChange: updateSwitchChange(d)
  }
}