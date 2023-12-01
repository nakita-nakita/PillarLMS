import { socketLookUpType } from "../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types";
import { EntityMenuType } from "../../preMain/scripts/SameDoc/adaptersFromMenuAndAnswers.script";
import { RealTimeAllAdapters } from "../../preMain/scripts/SameDoc/set.script";
import RealTimeYDocAdapter from "../adapters/RealTimeYDocAdapter";

type socketInput = {
  socketId: string
};

type resetPropsInput = {
  newProperties: RealTimeAdapterPropertyValue[]
}

type getDataType = {
  menu?: sameDocAdapterMenuType,
  props?: RealTimeAllAdapters,
  answers?: any,
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
  resetProps?: (resetPropsInput) => Promise<void>;
  
  //menu
  menu?: EntityMenuType
  
  //props and menu
  getData?: () => getDataType
};

export type SameDoc = {
  [entity: string]: EntityDocument;
};

