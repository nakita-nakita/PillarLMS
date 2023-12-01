import * as Y from 'yjs';
import { v4 as uuidv4 } from "uuid";
import { RealTimeYDocAdapterGraphQL, SelectionCursor } from "./RealTimeYDocAdapter.d";

type input = {
  initialText: string, 
  name: string, 
  label?: string,
}

class RealTimeYDocAdapter {
  //id
  public id?: string = uuidv4();
  public sameDocType?= "YDOC:V1"
  public name?: string;

  //props
  public order?: number = 0;
  private orderCounter?: number = 0;

  private selections?: SelectionCursor[] = []; // Updated to an array

  public ydoc?: Y.Doc;
  public yText?: Y.Text;
  public textValue?: string;
  public readableTextValue?: string = "";

  //display
  public label?: string;

  constructor({ initialText, name, label }: input) {
    this.name = name;
    this.ydoc = new Y.Doc();
    const yText = this.ydoc.getText('quill');

    // Set the initial content of the Yjs Text
    yText.insert(0, initialText);


    this.textValue = this.getTextValue()
    this.ydoc.on('update', (update, origin) => {

      this.textValue = this.getTextValue()
      // console.log('Document updated!', this.textValue);
    });

    this.readableTextValue = initialText;

    // display
    this.label = label;
  }

  // Add a new selection cursor or update if it already exists
  async addOrUpdateSelection?(selectionCursor: SelectionCursor): Promise<number> {
    // Update to handle the change from Map to Array for selections
    const index = this.selections.findIndex(sel => sel.userId === selectionCursor.userId);

    if (index !== -1) {
      this.selections[index] = selectionCursor;
    } else {
      this.selections.push(selectionCursor);
    }
    // Add socket updates with new samedoc feature

    this.order = ++this.orderCounter;

    return this.order
  }

  // Remove a selection cursor by userId
  async removeSelection?(userId: string): Promise<number> {
    const index = this.selections.findIndex(sel => sel.userId === userId);
    if (index !== -1) {
      this.selections.splice(index, 1);
    }

    this.order = ++this.orderCounter;

    return this.order
  }

  // Check if a selection cursor for a given userId exists
  hasSelection?(userId: string): boolean {
    return this.selections.some(sel => sel.userId === userId);
  }

  // Get the selection cursor of a user by userId
  getSelection?(userId: string): SelectionCursor | undefined {
    return this.selections.find(sel => sel.userId === userId);
  }

  getAllSelections?(): SelectionCursor[] {
    return [...this.selections];
  }

  async applyYdocUpdate?(savedYdocUpdate: Uint8Array): Promise<number> {
    const yText = this.ydoc.getText('quill');
    // yText.applyDelta(new Uint8Array(savedYdocUpdate))
    Y.applyUpdate(this.ydoc, new Uint8Array(savedYdocUpdate));

    this.order = ++this.orderCounter;

    return this.order
  }

  updateReadableTextValue?(textValue: string): number {
    this.readableTextValue = textValue
    
    this.order = ++this.orderCounter;

    return this.order
  }

  private getTextValue?(): string {
    // const value = this.ydoc.getText("quill").toString();
    const updatedDoc = Y.encodeStateAsUpdate(this.ydoc);
    const base64Encoded = Buffer.from(updatedDoc).toString('base64');
    return base64Encoded;
  }

  getData?() {
    return {
      sameDocType: this.sameDocType,
      name: this.name,
      order: this.order,
      selections: this.selections,
      textValue: this.textValue,
      label: this.label,
      readableTextValue: this.readableTextValue,
    }
  }
}

export default RealTimeYDocAdapter;
