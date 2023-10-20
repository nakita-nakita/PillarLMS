import { d_allDomain } from "../../../../utils/types/dependencyInjection.types";
import updateColorChange from "./scripts/ColorPicker/updateColorChange.script";

export default function makeCollaborateSameDocColorPicker(d: d_allDomain) {
  return {
    updateColorChange: updateColorChange(d)
  }
}