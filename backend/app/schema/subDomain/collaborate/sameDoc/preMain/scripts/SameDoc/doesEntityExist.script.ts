import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import { EntityDocument } from "../../../forUsage/types/RealTimeEntity";

type input = {
  entity: string
}

export default function doesEntityExist(d: d_allDomain) {
  return async (args: input): Promise<returningSuccessObj<EntityDocument>> => {
    const singletonFunc = makeSingleton(d);
    const singleton = await singletonFunc.get();

    if (!singleton.data?.sameDoc) {
      // init if doesn't exist.
      singleton.data.sameDoc = {};
    }

    const entityData = singleton.data.sameDoc[args.entity];
    const hasProperties = entityData && typeof entityData === 'object' && Object.keys(entityData).length > 0;

    return {
      success: true,
      result: hasProperties,
    };
  }
}
