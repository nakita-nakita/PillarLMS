import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { SelectionTypeEnum } from "../../../../../../../models/subDomain/backend/setting/backendSettingHeader.model";
import makeClientSitePageBrowserSql from "../../../preMain/clientSitePageBrowser.sql";

type input = {
  id?: string;
  pageId?: string;
  tabName?: string;
};

export default function setList(d: dependencies) {
  const { errorHandler, loggers } = d

  return async (args: input[]): Promise<returningSuccessObj<null>> => {

    const sql = makeClientSitePageBrowserSql(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args || args?.length === 0) {
      return endMainFromError({
        hint: "Please provide data.",
        errorIdentifier: "clientSitePageBrowser_setList_error:0001"
      })
    }

    for (let i = 0; i < args.length; i++) {
      const data = args[i];

      if (data.id) {
        const isIdUuid = stringHelpers.isStringValidUuid({
          str: data.id,
        })

        if (!isIdUuid.result) {
          return endMainFromError({
            hint: "'id' is provided but is not a UUID.",
            errorIdentifier: "clientSitePageBrowser_setList_error:0002"
          })
        }
      }
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await sql.setList(args).catch(error => errorHandler(error, loggers))

    return response
  }
}