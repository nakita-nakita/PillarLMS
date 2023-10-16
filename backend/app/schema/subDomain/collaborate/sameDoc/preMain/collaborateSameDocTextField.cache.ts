import { d_allDomain } from "../../../../utils/types/dependencyInjection.types";
import updateYdocChange from "./scripts/TextField/updateYdocChange.script";
import updateSelectionChange from "./scripts/TextField/updateSelectionChange.script";

export default function makeCollaborateSameDocTextField(d: d_allDomain) {
  return {
    updateYdocChange: updateYdocChange(d),
    updateSelectionChange: updateSelectionChange(d),
  }
}