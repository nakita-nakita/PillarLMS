import { socketLookUpType } from "../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types";
import RealTimeYDocAdapter from "../adapters/RealTimeYDocAdapter";

type socketInput = {
    socketId: string
};

export type EntityDocument = {
    sockets?: socketLookUpType[];
    [propName: string]: RealTimeYDocAdapter | socketLookUpType[] | Function;
    addSocket?: ({ socketId }: { socketId: string }) => Promise<void>;
    removeSocket?: ({ socketId }: { socketId: string }) => Promise<void>;
};

export type SameDoc = {
    [entity: string]: EntityDocument;
};

