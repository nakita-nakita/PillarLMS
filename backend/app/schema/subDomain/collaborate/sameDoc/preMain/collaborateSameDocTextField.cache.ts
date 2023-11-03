import updateYdocChange from "./scripts/TextField/updateYdocChange.script";
import updateSelectionChange from "./scripts/TextField/updateSelectionChange.script";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";

export default function makeCollaborateSameDocTextField(d: dependencies) {
  return {
    updateYdocChange: updateYdocChange(d),
    updateSelectionChange: updateSelectionChange(d),
  }
}