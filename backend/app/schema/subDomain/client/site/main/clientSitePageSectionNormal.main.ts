import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageSectionNormalMain/addOne.script";
import deleteOne from "./scripts/pageSectionNormalMain/deleteOne.script";
import getManyByPageId from "./scripts/pageSectionNormalMain/getManyByPageId.script";
import getOneById from "./scripts/pageSectionNormalMain/getOneById.script";
import updateOne from "./scripts/pageSectionNormalMain/updateOne.script";
import setList from "./scripts/pageSectionNormalMain/setList.script";

export default function makeClientSitePageSectionNormalMain(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyByPageId: getManyByPageId(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
    setList: setList(d),
  }
}
