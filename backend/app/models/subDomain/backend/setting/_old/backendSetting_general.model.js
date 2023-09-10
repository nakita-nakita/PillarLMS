module.exports = (sequelize, Sequelize) => {
  const backendSetting_general = sequelize.define(
    "backendSetting_general",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      companyName: {
        type: Sequelize.STRING,
      },
      address1: {
        type: Sequelize.STRING,
      },
      address2: {
        type: Sequelize.STRING,
      },
      address3: {
        type: Sequelize.STRING,
      },
      address4: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      postal: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
      creatorITHelpSupportEmail: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return backendSetting_general;
};
