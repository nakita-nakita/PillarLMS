import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import updateSelectionChange from "./scripts/FaviconSelection/updateSelectionChange.script";
import uploadFavicon from "./scripts/FaviconSelection/uploadFavicon.script";

export default function makeCollaborateSameDocFaviconSelection(d: dependencies) {
  return {
    updateSelectionChange: updateSelectionChange(d),
    uploadFavicon: uploadFavicon(d),
  }
}