module.exports = (sequelize, Sequelize) => {
  const foundationUserProfile = sequelize.define(
    "foundationUserProfile",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return foundationUserProfile;
};
