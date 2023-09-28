import { socketLookUpType } from "../socketLookUp/socketRecord.types"

export type meetingType = {
  id: string,
  name: string,
  url: string,
  leader: socketLookUpType,
  sockets?: socketLookUpType[],

  // for display
  users?: socketLookUpType[],
}