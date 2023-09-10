module.exports = (sequelize, Sequelize) => {
  const backendSiteDesigner_discussion = sequelize.define(
    "backendSiteDesigner_discussion",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING
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

  return backendSiteDesigner_discussion;
};
