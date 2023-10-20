import * as Y from 'yjs';
import { v4 as uuidv4 } from "uuid";
import { socketLookUpType } from '../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types';

type SelectionType = {
  id?: string,
  picture: string,
  //display
  user?: socketLookUpType
  createdAt?: number
}

class RealTimePictureSelectionAdapter {
  private orderCounter: number = 0;

  public id: string = uuidv4();
  public name: string;
  public order: number = 0;

  public selection: string = "NO_IMAGE" // "NO_IMAGE", "CURRENT_IMAGE", uploadId

  public currentSelection: SelectionType
  public uploads: SelectionType[] = []

  constructor({ picture, name }) {
    this.name = name;

    if (picture) {
      this.currentSelection = {
        picture,
      }
      this.selection = "CURRENT_IMAGE"
    }
  }

  async uploadPicture({ picture, socketLookUp }: { picture: string, socketLookUp: socketLookUpType }): Promise<number> {
    if (socketLookUp && !socketLookUp.id) {
      socketLookUp.id = socketLookUp.userId
    }

    const uploadData: SelectionType = {
      picture,
      user: socketLookUp,
      createdAt: Date.now(),
    }

    this.uploads.push(uploadData)

    this.selection = picture

    this.order = ++this.orderCounter;

    return this.order
  }

  async updateSelection({ selection }: { selection: string }): Promise<number> {
    this.selection = selection;

    this.order = ++this.orderCounter;

    return this.order
  }
}

export default RealTimePictureSelectionAdapter;
