import * as Y from 'yjs';
import { v4 as uuidv4 } from "uuid";
import { socketLookUpType } from '../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types';

type SelectionType = {
  id?: string,
  favicon: string,
  //display
  user?: socketLookUpType
  createdAt?: number
}

class RealTimeFaviconSelectionAdapter {
  private orderCounter: number = 0;

  public id: string = uuidv4();
  public name: string;
  public order: number = 0;

  public selection: string = "NO_FAVICON" // "NO_FAVICON", "CURRENT_FAVICON", uploadId

  public currentSelection: SelectionType
  public uploads: SelectionType[] = []

  constructor({ favicon, name }) {
    this.name = name;

    if (favicon) {
      this.currentSelection = {
        favicon,
      }
      this.selection = "CURRENT_FAVICON"
    }
  }

  async uploadFavicon({ favicon, socketLookUp }: { favicon: string, socketLookUp: socketLookUpType }): Promise<number> {
    if (socketLookUp && !socketLookUp.id) {
      socketLookUp.id = socketLookUp.userId
    }

    const uploadData: SelectionType = {
      favicon,
      user: socketLookUp,
      createdAt: Date.now(),
    }

    this.uploads.push(uploadData)

    this.selection = favicon

    this.order = ++this.orderCounter;

    return this.order
  }

  async updateSelection({ selection }: { selection: string }): Promise<number> {
    this.selection = selection;

    this.order = ++this.orderCounter;

    return this.order
  }
}

export default RealTimeFaviconSelectionAdapter;
