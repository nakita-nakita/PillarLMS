import * as Y from 'yjs';
import { v4 as uuidv4 } from "uuid";
import { socketLookUpType } from '../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types';

class RealTimeSwitchAdapter {
  private orderCounter: number = 0;

  public id: string = uuidv4();
  public order: number = 0;
  public booleanValue: boolean;
  public name: string;
  // for display, not for functionality when created.
  public user: socketLookUpType;

  constructor({ initialBoolean, name }) {
    this.name = name;
    this.booleanValue = initialBoolean
  }

  async updateSwitch({ booleanValue, socketLookUp }: { booleanValue: boolean, socketLookUp: socketLookUpType }): Promise<number> {
    if (socketLookUp && !socketLookUp.id) {
      socketLookUp.id = socketLookUp.userId
    }
    this.user = socketLookUp
    this.booleanValue = booleanValue

    this.order = ++this.orderCounter;

    return this.order
  }
}

export default RealTimeSwitchAdapter;
