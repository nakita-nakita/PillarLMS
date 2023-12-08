import { socketLookUpType } from "../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types";
import { EntityMenuType } from "../../preMain/scripts/SameDoc/adaptersFromMenuAndAnswers.script";
import { RealTimeAllAdapters } from "../../preMain/scripts/SameDoc/set.script";
import RealTimeYDocAdapter from "../adapters/RealTimeYDocAdapter";

type socketInput = {
  socketId: string
};

type updateMenuInput = {
  menu?: sameDocMenuType
}

type getDataType = {
  menu?: sameDocAdapterMenuType,
  props?: RealTimeAllAdapters,
  answers?: any,
  nonRealTimeProps?: any,
}

type updateMenuType = {
  menu: EntityMenuType
}

export type EntityDocument = {
  // socket control
  sockets?: socketLookUpType[];
  addSocket?: ({ socketId }: { socketId: string }) => Promise<void>;
  removeSocket?: ({ socketId }: { socketId: string }) => Promise<void>;

  //properties control, properties for the entity object is namespace on step down to allow sharing between properties, sockets, and more!
  props?: {
    [propName: string]: RealTimeAllAdapters;
  }
  nonRealTimeProps?: {
    [propName: string]: any;
  }
  userAnswers?: {
    [propName: string]: any;
  }
  updateUserAnswer?: ({name, value}) => Promise<void>
  
  //menu
  menu?: EntityMenuType
  updateMenu?: (updateMenuInput) => Promise<updateMenuType>;

  //props and menu
  getData?: () => getDataType
};

export type SameDoc = {
  [entity: string]: EntityDocument;
};

