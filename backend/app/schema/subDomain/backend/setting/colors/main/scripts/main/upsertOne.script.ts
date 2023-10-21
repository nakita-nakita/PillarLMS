import { Model } from "sequelize";
import { d_allDomain, d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import makeBackendSettingColorsSql from "../../../preMain/backendSettingColors.sql";
import backendSettingColors from "../../../../../../../../models/subDomain/backend/setting/backendSettingColors.model";

type input = {
  id?: string
  color1?: string
  color1Light1?: string
  color1Light2?: string
  color1Light3?: string
  color1Light4?: string
  color1Dark1?: string
  color1Dark2?: string
  color1Dark3?: string
  color1Dark4?: string
  color2?: string
  color2Light1?: string
  color2Light2?: string
  color2Light3?: string
  color2Light4?: string
  color2Dark1?: string
  color2Dark2?: string
  color2Dark3?: string
  color2Dark4?: string
  color3?: string
  color3Light1?: string
  color3Light2?: string
  color3Light3?: string
  color3Light4?: string
  color3Dark1?: string
  color3Dark2?: string
  color3Dark3?: string
  color3Dark4?: string
  color4?: string
  color4Light1?: string
  color4Light2?: string
  color4Light3?: string
  color4Light4?: string
  color4Dark1?: string
  color4Dark2?: string
  color4Dark3?: string
  color4Dark4?: string
  color5?: string
  color5Light1?: string
  color5Light2?: string
  color5Light3?: string
  color5Light4?: string
  color5Dark1?: string
  color5Dark2?: string
  color5Dark3?: string
  color5Dark4?: string
  color6?: string
  color6Light1?: string
  color6Light2?: string
  color6Light3?: string
  color6Light4?: string
  color6Dark1?: string
  color6Dark2?: string
  color6Dark3?: string
  color6Dark4?: string
  color7?: string
  color7Light1?: string
  color7Light2?: string
  color7Light3?: string
  color7Light4?: string
  color7Dark1?: string
  color7Dark2?: string
  color7Dark3?: string
  color7Dark4?: string
  color8?: string
  color8Light1?: string
  color8Light2?: string
  color8Light3?: string
  color8Light4?: string
  color8Dark1?: string
  color8Dark2?: string
  color8Dark3?: string
  color8Dark4?: string
  color9?: string
  color9Light1?: string
  color9Light2?: string
  color9Light3?: string
  color9Light4?: string
  color9Dark1?: string
  color9Dark2?: string
  color9Dark3?: string
  color9Dark4?: string
}


export default function upsertOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingColors> | null>> => {

    const d = {
      subDomainDb,
      errorHandler,
      subDomainTransaction,
      loggers,
    }
    const sql = makeBackendSettingColorsSql(d);

    const response = sql.upsertOne({
      id: args.id,
      color1: args.color1,
      color1Light1: args.color1Light1,
      color1Light2: args.color1Light2,
      color1Light3: args.color1Light3,
      color1Light4: args.color1Light4,
      color1Dark1: args.color1Dark1,
      color1Dark2: args.color1Dark2,
      color1Dark3: args.color1Dark3,
      color1Dark4: args.color1Dark4,
      color2: args.color2,
      color2Light1: args.color2Light1,
      color2Light2: args.color2Light2,
      color2Light3: args.color2Light3,
      color2Light4: args.color2Light4,
      color2Dark1: args.color2Dark1,
      color2Dark2: args.color2Dark2,
      color2Dark3: args.color2Dark3,
      color2Dark4: args.color2Dark4,
      color3: args.color3,
      color3Light1: args.color3Light1,
      color3Light2: args.color3Light2,
      color3Light3: args.color3Light3,
      color3Light4: args.color3Light4,
      color3Dark1: args.color3Dark1,
      color3Dark2: args.color3Dark2,
      color3Dark3: args.color3Dark3,
      color3Dark4: args.color3Dark4,
      color4: args.color4,
      color4Light1: args.color4Light1,
      color4Light2: args.color4Light2,
      color4Light3: args.color4Light3,
      color4Light4: args.color4Light4,
      color4Dark1: args.color4Dark1,
      color4Dark2: args.color4Dark2,
      color4Dark3: args.color4Dark3,
      color4Dark4: args.color4Dark4,
      color5: args.color5,
      color5Light1: args.color5Light1,
      color5Light2: args.color5Light2,
      color5Light3: args.color5Light3,
      color5Light4: args.color5Light4,
      color5Dark1: args.color5Dark1,
      color5Dark2: args.color5Dark2,
      color5Dark3: args.color5Dark3,
      color5Dark4: args.color5Dark4,
      color6: args.color6,
      color6Light1: args.color6Light1,
      color6Light2: args.color6Light2,
      color6Light3: args.color6Light3,
      color6Light4: args.color6Light4,
      color6Dark1: args.color6Dark1,
      color6Dark2: args.color6Dark2,
      color6Dark3: args.color6Dark3,
      color6Dark4: args.color6Dark4,
      color7: args.color7,
      color7Light1: args.color7Light1,
      color7Light2: args.color7Light2,
      color7Light3: args.color7Light3,
      color7Light4: args.color7Light4,
      color7Dark1: args.color7Dark1,
      color7Dark2: args.color7Dark2,
      color7Dark3: args.color7Dark3,
      color7Dark4: args.color7Dark4,
      color8: args.color8,
      color8Light1: args.color8Light1,
      color8Light2: args.color8Light2,
      color8Light3: args.color8Light3,
      color8Light4: args.color8Light4,
      color8Dark1: args.color8Dark1,
      color8Dark2: args.color8Dark2,
      color8Dark3: args.color8Dark3,
      color8Dark4: args.color8Dark4,
      color9: args.color9,
      color9Light1: args.color9Light1,
      color9Light2: args.color9Light2,
      color9Light3: args.color9Light3,
      color9Light4: args.color9Light4,
      color9Dark1: args.color9Dark1,
      color9Dark2: args.color9Dark2,
      color9Dark3: args.color9Dark3,
      color9Dark4: args.color9Dark4,
    })
    // .catch(error => errorHandler(error, loggers))

    return response
  }
}