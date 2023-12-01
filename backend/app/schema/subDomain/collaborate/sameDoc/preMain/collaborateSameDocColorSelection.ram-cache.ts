import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import updateColorChange from "./scripts/ColorSelection/updateColorChange.script";

export default function makeCollaborateSameDocColorSelection(d: dependencies) {
  return {
    updateColorChange: updateColorChange(d)
  }
}