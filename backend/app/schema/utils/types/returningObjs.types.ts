export type returningSuccessObj<T> = {
  // did nothing good or bad happen?
  success: boolean,

  // something good happen
  result?: boolean,
  data?: T,

  // something bad happen
  humanMessage?: string,
  errorIdentifier? : string
}
