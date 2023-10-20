import { d_allDomain } from "../../../../utils/types/dependencyInjection.types";
import updateSelectionChange from "./scripts/PictureSelection/updateSelectionChange.script";
import uploadPicture from "./scripts/PictureSelection/uploadPicture.script";

export default function makeCollaborateSameDocPictureSelection(d: d_allDomain) {
  return {
    updateSelectionChange: updateSelectionChange(d),
    uploadPicture: uploadPicture(d),

  }
}