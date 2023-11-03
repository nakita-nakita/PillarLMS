import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import updateSelectionChange from "./scripts/PictureSelection/updateSelectionChange.script";
import uploadPicture from "./scripts/PictureSelection/uploadPicture.script";

export default function makeCollaborateSameDocPictureSelection(d: dependencies) {
  return {
    updateSelectionChange: updateSelectionChange(d),
    uploadPicture: uploadPicture(d),

  }
}