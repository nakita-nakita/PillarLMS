import { v4 as uuidv4 } from "uuid";
import { socketLookUpType } from '../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types';

type input = {
  name: string,
  media: string,
  label?: string,
}

type SelectionType = {
  id?: string,
  media: string,
  //display
  user?: socketLookUpType
  createdAt?: number
}

class RealTimeMediaSelectionAdapter {
  private orderCounter: number = 0;

  //id
  public id?: string = uuidv4();
  public sameDocType? = "MEDIA_SELECTION:V1"
  public name?: string;

  //props
  public order?: number = 0;

  public selection?: string = "NO_MEDIA" // "NO_MEDIA", "CURRENT_MEDIA", uploadId

  public currentSelection?: SelectionType
  public uploads?: SelectionType[] = []

  //display
  public label?: string

  constructor({ media, name, label }: input) {
    this.name = name;

    if (media) {
      this.currentSelection = {
        media,
      }
      this.selection = "CURRENT_MEDIA"
    }

    if (label) {
      this.label = label
    }
  }

  async uploadMedia?({ media, socketLookUp }: { media: string, socketLookUp: socketLookUpType }): Promise<number> {
    if (socketLookUp && !socketLookUp.id) {
      socketLookUp.id = socketLookUp.userId
    }

    const uploadData: SelectionType = {
      media,
      user: socketLookUp,
      createdAt: Date.now(),
    }

    this.uploads.push(uploadData)

    this.selection = media

    this.order = ++this.orderCounter;

    return this.order
  }

  async updateSelection?({ selection }: { selection: string }): Promise<number> {
    this.selection = selection;

    this.order = ++this.orderCounter;

    return this.order
  }

  getData?() {
    const uploads: any[] = [...this.uploads]

    return {
      sameDocType: this.sameDocType,
      name: this.name,
      order: this.order,
      selection: this.selection,
      currentSelection: this.currentSelection,
      uploads: uploads.map(upload => {
        upload.user = {
          circleColor: upload.user.circleColor,
          labelColor: upload.user.labelColor,
          displayName: upload.user.displayName,
          picture: upload.user.picture,
        }

        return upload
      }),
    }
  }
}

export default RealTimeMediaSelectionAdapter;
