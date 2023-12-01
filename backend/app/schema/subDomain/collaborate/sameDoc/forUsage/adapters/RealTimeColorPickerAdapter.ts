import * as Y from 'yjs';
import { v4 as uuidv4 } from "uuid";
import { socketLookUpType } from '../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types';
import chroma from 'chroma-js';

class RealTimeColorAdapter {
  private orderCounter: number = 0;

  // id
  public id?: string = uuidv4();
  public sameDocType?= "COLOR_PICKER:V1"
  public name?: string;

  public order?: number = 0;
  public color?: string;
  // for display, not for functionality when created.
  public user?: socketLookUpType;

  public colorLight1?: string;
  public colorLight2?: string;
  public colorLight3?: string;
  public colorLight4?: string;
  public colorDark1?: string;
  public colorDark2?: string;
  public colorDark3?: string;
  public colorDark4?: string;

  constructor({
    color,
    name,
    colorLight1,
    colorLight2,
    colorLight3,
    colorLight4,
    colorDark1,
    colorDark2,
    colorDark3,
    colorDark4,
  }: {
    color: string
    name: string
    colorLight1?: string
    colorLight2?: string
    colorLight3?: string
    colorLight4?: string
    colorDark1?: string
    colorDark2?: string
    colorDark3?: string
    colorDark4?: string

  }) {
    this.name = name;
    this.color = color
    this.colorLight1 = colorLight1;
    this.colorLight2 = colorLight2;
    this.colorLight3 = colorLight3;
    this.colorLight4 = colorLight4;
    this.colorDark1 = colorDark1;
    this.colorDark2 = colorDark2;
    this.colorDark3 = colorDark3;
    this.colorDark4 = colorDark4;
  }

  async updateColor?({ color, socketLookUp }: { color: string, socketLookUp: socketLookUpType }): Promise<number> {
    if (socketLookUp && !socketLookUp.id) {
      socketLookUp.id = socketLookUp.userId
    }
    this.user = socketLookUp
    this.color = color

    this.colorLight1 = chroma(color).brighten(1).hex()
    this.colorLight2 = chroma(color).brighten(0.75).hex()
    this.colorLight3 = chroma(color).brighten(0.5).hex()
    this.colorLight4 = chroma(color).brighten(0.25).hex()
    this.colorDark1 = chroma(color).darken(0.25).hex()
    this.colorDark2 = chroma(color).darken(0.5).hex()
    this.colorDark3 = chroma(color).darken(0.75).hex()
    this.colorDark4 = chroma(color).darken(1).hex()

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
      colorLight1: this.colorLight1,
      colorLight2: this.colorLight2,
      colorLight3: this.colorLight3,
      colorLight4: this.colorLight4,
      colorDark1: this.colorDark1,
      colorDark2: this.colorDark2,
      colorDark3: this.colorDark3,
      colorDark4: this.colorDark4,
    }
  }
}

export default RealTimeColorAdapter;
