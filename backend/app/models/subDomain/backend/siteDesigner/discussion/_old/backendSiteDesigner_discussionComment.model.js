module.exports = (sequelize, Sequelize) => {
  const backendSiteDesigner_discussionComment = sequelize.define(
    "backendSiteDesigner_discussionComment",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      post: {
        type: Sequelize.STRING
      },
      hasBeenEdited: {
        type: Sequelize.BOOLEAN
      }
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return backendSiteDesigner_discussionComment;
};
