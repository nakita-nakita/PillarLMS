import { v4 as uuidv4 } from "uuid";
import { socketLookUpType } from '../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types';

type input = {
  color: any,
  name: string,
  label?: string,
  isShowing?: string,
}

class RealTimeColorSelectionAdapter {
  private orderCounter: number = 0;

  // id
  public id?: string = uuidv4();
  public sameDocType?= "COLOR_SELECTION:V1"
  public name?: string;

  public order?: number = 0;
  public color?: any;
  // for display, not for functionality when created.
  public user?: socketLookUpType;

  //display
  public label: string;
  public isShowing: string;

  constructor({
    color,
    name,
    label,
    isShowing,
  }: input) {
    this.name = name;
    this.color = color;
    //display
    this.label = label;
    this.isShowing = isShowing;
  }

  async updateColor?({ color, socketLookUp }: { color: string, socketLookUp: socketLookUpType }): Promise<number> {
    if (socketLookUp && !socketLookUp.id) {
      socketLookUp.id = socketLookUp.userId
    }
    this.user = socketLookUp
    this.color = color


    this.order = ++this.orderCounter;

    return this.order
  }


  getData?() {
    let user = this.user ? {
      displayName: this.user.displayName,
      circleColor: this.user.circleColor,
      labelColor: this.user.labelColor,
      picture: this.user.picture,
    } : null

    return {
      sameDocType: this.sameDocType,
      order: this.order,
      color: this.color,
      name: this.name,
      user,
      //menu display
      label: this.label,
      isShowing: this.isShowing,
    }
  }
}

export default RealTimeColorSelectionAdapter;
