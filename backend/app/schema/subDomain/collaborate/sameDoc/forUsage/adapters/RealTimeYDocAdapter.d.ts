import * as Y from 'yjs';

export type RealTimeObject = {
  ydoc: string;
  order: number;
};

export type SelectionCursor = {
  userId: string;
  username: string;
  userColor: string;
  range: any;  // Ideally, this would be typed with a more specific Quill type.
};

declare class RealTimeYDocAdapter {
  private orderCounter?: number;
  private selections?: SelectionCursor[]; // Changed from a Map to an Array

  public id?: string;
  public sameDocType?: string;
  
  public ydoc?: Y.Doc;
  public textValue?: string;
  public order?: number;
  public name?: string;

  constructor({ initialText, name }: { initialText: string, name: string });

  addOrUpdateSelection?(selectionCursor: SelectionCursor): void;
  removeSelection?(userId: string): boolean;
  hasSelection?(userId: string): boolean;
  getSelection?(userId: string): SelectionCursor | undefined;
  getAllSelections?(): SelectionCursor[];
  applyYdocUpdate?(savedYdocUpdate: Uint8Array): void;  // Based on Y.js documentation for applyUpdate.
  private getTextValue?(): string;

  updateReadableTextValue?(textValue: string): number
}

export type RealTimeYDocAdapterGraphQL = {
  id: string
  order: number
  textValue: string
  selections: SelectionCursor[]
}


export default RealTimeYDocAdapter;
