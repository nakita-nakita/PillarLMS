import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import updateColorChange from "./scripts/ColorPicker/updateColorChange.script";

export default function makeCollaborateSameDocColorPicker(d: dependencies) {
  return {
    updateColorChange: updateColorChange(d)
  }
}