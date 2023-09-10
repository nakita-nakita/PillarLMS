/**
 * The log of the logo of the company uploaded in the application.
 * @typedef {Image} systemImageLog_companyLogo
 * @property id {number}
 * @property filename {string}
 */

module.exports = (sequelize, Sequelize) => {
  const systemImageLog_companyLogo = sequelize.define(
    "systemImageLog_companyLogo",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },
    {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    }
  );

  return systemImageLog_companyLogo;
};
