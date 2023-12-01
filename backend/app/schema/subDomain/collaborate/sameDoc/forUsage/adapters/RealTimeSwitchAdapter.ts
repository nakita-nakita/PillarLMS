import * as Y from 'yjs';
import { v4 as uuidv4 } from "uuid";
import { socketLookUpType } from '../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types';

type input = {
  initialBoolean: boolean, 
  name: string, 
  label?: string,
}

class RealTimeSwitchAdapter {
  private orderCounter: number = 0;

  //id
  public id?: string = uuidv4();
  public sameDocType? = "SWITCH:V1"
  public name?: string;

  //props
  public order?: number = 0;
  public booleanValue?: boolean;
  // for display, not for functionality when created.
  public user?: socketLookUpType;

  //display
  public label?: string

  constructor({ initialBoolean, name, label }: input) {
    this.name = name;
    this.booleanValue = initialBoolean
    this.label = label
  }

  async updateSwitch?({ booleanValue, socketLookUp }: { booleanValue: boolean, socketLookUp: socketLookUpType }): Promise<number> {
    if (socketLookUp && !socketLookUp.id) {
      socketLookUp.id = socketLookUp.userId
    }
    this.user = socketLookUp
    this.booleanValue = booleanValue

    this.order = ++this.orderCounter;

    return this.order
  }
  
  getData?() {
    
    let user
    if (this.user) {
      user = {...this.user};

      delete user.socket;
    }

    return {
      sameDocType: this.sameDocType,
      name: this.name,
      order: this.order,
      booleanValue: this.booleanValue,
      user,
      label: this.label,
    }
  }
}

export default RealTimeSwitchAdapter;
