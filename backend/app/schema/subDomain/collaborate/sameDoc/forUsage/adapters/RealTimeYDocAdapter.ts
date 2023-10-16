// import { JSDOM } from 'jsdom';

// declare global {
//   interface Document {
//     createDiv: () => HTMLDivElement;
//   }
//   namespace NodeJS {
//     interface Global {
//       document: Document;
//       window: typeof window;
//       Node: any;
//       HTMLElement: any;
//       navigator: {
//         userAgent: string;
//         platform?: string; // and other properties you might need
//       };
//     }
//   }
// }

// // hacky, but we can
// if (typeof window === 'undefined') {
//   const dom = new JSDOM();
//   global.window = dom.window;
//   global.document = dom.window.document;
//   global.Node = dom.window.Node; // Add this line
//   global.HTMLElement = dom.window.HTMLElement; // Add this too, if needed
//   global.navigator = dom.window.navigator;

//   // // Mock the navigator object
//   // global.navigator = {
//   //   userAgent: 'node.js', // Or any user agent string you find appropriate
//   // };

//   // Create a mock div element for Quill
//   global.document.createDiv = () => {
//     const div = dom.window.document.createElement('div');
//     dom.window.document.body.appendChild(div);
//     return div;
//   };
// }

// import * as Y from 'yjs';
// import { v4 as uuidv4 } from "uuid";
// import { RealTimeYDocAdapterGraphQL, SelectionCursor } from "./RealTimeYDocAdapter.d";
// import Quill from 'quill';

// class RealTimeYDocAdapter {
//   private orderCounter: number = 0;
//   private selections: SelectionCursor[] = []; // Updated to an array

//   public id: string = uuidv4();
//   public ydoc: Y.Doc;
//   public yText: Y.Text;
//   public textValue: string;
//   public order: number = 0;
//   public name: string;
//   public quill: Quill;

//   constructor({ initialText, name }) {
//     this.name = name;
//     this.ydoc = new Y.Doc();
//     const yText = this.ydoc.getText('y-text');


//     // Set the initial content of the Yjs Text
//     // yText.insert(0, initialText);
//     this.quill = new Quill(global.document.createDiv(), {
//       /* your quill options here */
//     });

//     this.quill.setText(initialText)



//     this.textValue = this.getTextValue()
//     this.ydoc.on('update', (update, origin) => {
//       console.log('Document updated!', update, origin);

//       // left off here.
//       // this.text = Buffer.from(Y.snapshot(this.ydoc))).toString('base64')
//       this.textValue = this.getTextValue()
//     });
//   }


//   destroy() {
//     this.quill = null; // destroy the quill instance
//     this.ydoc.destroy(); // destroy the ydoc instance
//   }

//   // Add a new selection cursor or update if it already exists
//   addOrUpdateSelection(selectionCursor: SelectionCursor): void {
//     // Update to handle the change from Map to Array for selections
//     const index = this.selections.findIndex(sel => sel.userId === selectionCursor.userId);

//     if (index !== -1) {
//       this.selections[index] = selectionCursor;
//     } else {
//       this.selections.push(selectionCursor);
//     }
//     // Add socket updates with new samedoc feature
//   }

//   // Remove a selection cursor by userId
//   removeSelection(userId: string): boolean {
//     const index = this.selections.findIndex(sel => sel.userId === userId);
//     if (index !== -1) {
//       this.selections.splice(index, 1);
//       return true;
//     }
//     return false;
//   }

//   // Check if a selection cursor for a given userId exists
//   hasSelection(userId: string): boolean {
//     return this.selections.some(sel => sel.userId === userId);
//   }

//   // Get the selection cursor of a user by userId
//   getSelection(userId: string): SelectionCursor | undefined {
//     return this.selections.find(sel => sel.userId === userId);
//   }

//   getAllSelections(): SelectionCursor[] {
//     return [...this.selections];
//   }

//   applyYdocUpdate(savedYdocUpdate: Uint8Array): void {
//     const yText = this.ydoc.getText('y-text');
//     // yText.applyDelta(new Uint8Array(savedYdocUpdate))
//     Y.applyUpdate(this.ydoc, new Uint8Array(savedYdocUpdate));

//     this.order = ++this.orderCounter;
//   }

//   private getTextValue(): string {
//     // const yText = this.ydoc.getText('y-text');
//     // return yText.toString();
//     return this.quill.getText();
//   }

// }

// export default RealTimeYDocAdapter;


import * as Y from 'yjs';
import { v4 as uuidv4 } from "uuid";
import { RealTimeYDocAdapterGraphQL, SelectionCursor } from "./RealTimeYDocAdapter.d";

class RealTimeYDocAdapter {
  private orderCounter: number = 0;
  private selections: SelectionCursor[] = []; // Updated to an array

  public id: string = uuidv4();
  public ydoc: Y.Doc;
  public yText: Y.Text;
  public textValue: string;
  public order: number = 0;
  public name: string;

  constructor({ initialText, name }) {
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
  }

  // Add a new selection cursor or update if it already exists
  async addOrUpdateSelection(selectionCursor: SelectionCursor): Promise<number> {
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
  async removeSelection(userId: string): Promise<number> {
    const index = this.selections.findIndex(sel => sel.userId === userId);
    if (index !== -1) {
      this.selections.splice(index, 1);
    }
    
    this.order = ++this.orderCounter;

    return this.order
  }

  // Check if a selection cursor for a given userId exists
  hasSelection(userId: string): boolean {
    return this.selections.some(sel => sel.userId === userId);
  }

  // Get the selection cursor of a user by userId
  getSelection(userId: string): SelectionCursor | undefined {
    return this.selections.find(sel => sel.userId === userId);
  }

  getAllSelections(): SelectionCursor[] {
    return [...this.selections];
  }

  async applyYdocUpdate(savedYdocUpdate: Uint8Array): Promise<number> {
    const yText = this.ydoc.getText('quill');
    // yText.applyDelta(new Uint8Array(savedYdocUpdate))
    Y.applyUpdate(this.ydoc, new Uint8Array(savedYdocUpdate));

    this.order = ++this.orderCounter;

    return this.order
  }

  private getTextValue(): string {
    // const value = this.ydoc.getText("quill").toString();
    const updatedDoc = Y.encodeStateAsUpdate(this.ydoc);
    const base64Encoded = Buffer.from(updatedDoc).toString('base64');
    return base64Encoded;
  }

}

export default RealTimeYDocAdapter;
