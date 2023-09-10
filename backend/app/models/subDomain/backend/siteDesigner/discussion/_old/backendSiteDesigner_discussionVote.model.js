module.exports = (sequelize, Sequelize) => {
  const backendSiteDesigner_discussionVote = sequelize.define(
    "backendSiteDesigner_discussionVote",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      vote: { // 1, 0, or -1
        type: Sequelize.SMALLINT,
        allowNull: false,
        default: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return backendSiteDesigner_discussionVote;
};
