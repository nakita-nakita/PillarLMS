export enum backendSiteDesignerDiscussionVoteEnum {
  UP = "UP",
  DOWN = "DOWN",
  NONE = "NONE",
}

export const convertNumberToVote = (vote: number): backendSiteDesignerDiscussionVoteEnum => {
  switch (vote) {
    case 1:
      return backendSiteDesignerDiscussionVoteEnum.UP;
    case -1:
      return backendSiteDesignerDiscussionVoteEnum.DOWN;
    case 0:
      return backendSiteDesignerDiscussionVoteEnum.NONE;
    default:
      return backendSiteDesignerDiscussionVoteEnum.NONE;
  }
}

export const convertVoteToNumber = (vote: backendSiteDesignerDiscussionVoteEnum): number => {
  switch (vote) {
    case backendSiteDesignerDiscussionVoteEnum.UP:
      return 1;
    case backendSiteDesignerDiscussionVoteEnum.DOWN:
      return -1;
    case backendSiteDesignerDiscussionVoteEnum.NONE:
      return 0;
    default:
      return 0;
  }
}