import updateYdocChange from "./scripts/TextField/updateYdocChange.script";
import updateSelectionChange from "./scripts/TextField/updateSelectionChange.script";
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import updateReadableTextValueChange from "./scripts/TextField/updateReadableTextValueChange.script";

export default function makeCollaborateSameDocTextField(d: dependencies) {
  return {
    updateYdocChange: updateYdocChange(d),
    updateSelectionChange: updateSelectionChange(d),
    updateReadableTextValueChange: updateReadableTextValueChange(d),
  }
}