import { d_allDomain } from "../../../../utils/types/dependencyInjection.types";
import updateSelectionChange from "./scripts/FaviconSelection/updateSelectionChange.script";
import uploadFavicon from "./scripts/FaviconSelection/uploadFavicon.script";

export default function makeCollaborateSameDocFaviconSelection(d: d_allDomain) {
  return {
    updateSelectionChange: updateSelectionChange(d),
    uploadFavicon: uploadFavicon(d),
  }
}