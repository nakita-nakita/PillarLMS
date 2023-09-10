/**
 * The functions responsible for handling the courseDiscussionComment type.
 * @module courseDiscussionComment_logic
 */

module.exports = (db) => {
  const Op = db.Sequelize.Op;

  const convertNumberToVote = (numberVote) => {
    switch (numberVote) {
      case 1:
        return "UP";
      case -1:
        return "DOWN";
      case 0:
        return "NONE";
      default:
        return "NONE";
    }
  }


  const convertVoteToNumber = (vote) => {
    switch (vote) {
      case "UP":
        return 1;
      case "DOWN":
        return -1;
      case "NONE":
        return 0;
      default:
        return 0;
    }
  }

  const getTotalVoteForDiscussion = ({ courseDiscussionId }) => {
    return new Promise(async (resolve) => {
      //become a sum
      const data = await db.courseDiscussionVote.findOne({
        attributes: [
          [sequelize.fn('sum', sequelize.col('vote')), 'voteTotal']
        ],
        where: {
          courseDiscussionId,
          isDeleted: false
        },
        raw: true
      });

      resolve({ voteTotal: data.voteTotal })
    })
  }

  const getMyVoteForDiscussion = ({ courseDiscussionId, userId }) => {
    return new Promise(async (resolve) => {
      const data = await db.courseDiscussionVote.findOne({
        where: {
          courseDiscussionId,
          userId,
          isDeleted: false
        },
        raw: true
      });

      resolve({ value: convertNumberToVote(data?.vote) })
    })
  }

  const setMyVoteForDiscussion = ({ courseDiscussionId, userId, vote }) => {
    return new Promise(async (resolve, reject) => {
      let data;
      const voteNumber = convertVoteToNumber(vote);

      const record = await db.courseDiscussionVote.findOne({
        where: {
          courseDiscussionId,
          userId,
          isDeleted: false
        },
        raw: true
      });


      if (record) {
        data = await db.courseDiscussionVote.update(
          { vote: voteNumber },
          {
            where: {
              courseDiscussionId,
              userId,
              isDeleted: false
            },
            returning: true,
            raw: true,
          }
        );
        data = data[0] !== 0 ? data[1][0] : {}
      } else {

        data = db.courseDiscussionVote.build({
          courseDiscussionId,
          userId,
          vote: voteNumber
        });
        await data.save()
      }

      resolve({ value: convertNumberToVote(data?.vote)  })
    })
  }


  return {
    getTotalVoteForDiscussion,
    getMyVoteForDiscussion,
    setMyVoteForDiscussion,
  }

}


