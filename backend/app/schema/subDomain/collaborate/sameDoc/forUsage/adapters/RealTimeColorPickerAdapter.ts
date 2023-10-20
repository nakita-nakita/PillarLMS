import * as Y from 'yjs';
import { v4 as uuidv4 } from "uuid";
import { socketLookUpType } from '../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types';

class RealTimeColorAdapter {
  private orderCounter: number = 0;

  public id: string = uuidv4();
  public order: number = 0;
  public color: string;
  public name: string;
  // for display, not for functionality when created.
  public user: socketLookUpType;

  constructor({ color, name }) {
    this.name = name;
    this.color = color
  }

  async updateColor({ color, socketLookUp }: { color: string, socketLookUp: socketLookUpType }): Promise<number> {
    if (socketLookUp && !socketLookUp.id) {
      socketLookUp.id = socketLookUp.userId
    }
    this.user = socketLookUp
    this.color = color

    this.order = ++this.orderCounter;

    return this.order
  }
}

export default RealTimeColorAdapter;
