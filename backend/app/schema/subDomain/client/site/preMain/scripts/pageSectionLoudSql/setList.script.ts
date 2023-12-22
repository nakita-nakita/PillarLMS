import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeSetList from "../../../../../../utils/engine/setList.engine";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type Input = {
  pageId: string;
  id?: string;
  webAssetImport?: string;
  userAnswersJsonB?: string;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
};

export default function setList(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (setArray: Input[]): Promise<returningSuccessObj<null>> => {

    const setListEngine = makeSetList(d)

    const response = await setListEngine({
      setArray,
      dbEntity: db.clientSitePageSectionLoud,
      transaction: d.subDomainTransaction,
      currentDbArray: await db.clientSitePageSectionLoud.findAll({
        transaction: d.subDomainTransaction,
      })
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}