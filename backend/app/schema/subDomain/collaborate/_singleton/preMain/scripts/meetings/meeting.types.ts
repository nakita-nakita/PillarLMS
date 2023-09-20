import { socketLookUpType } from "../socketLookUp/socketRecord.types"

export type meeting = {
  id: string,
  name: string,
  url: string,
  leader: socketLookUpType,
  users?: socketLookUpType[],
}