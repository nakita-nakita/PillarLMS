import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import updateSelectionChange from "./scripts/MediaSelection/updateSelectionChange.script";
import uploadMedia from "./scripts/MediaSelection/uploadMedia.script";

export default function makeCollaborateSameDocMediaSelection(d: dependencies) {
  return {
    updateSelectionChange: updateSelectionChange(d),
    uploadMedia: uploadMedia(d),
  }
}