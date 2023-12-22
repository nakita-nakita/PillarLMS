
const sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('clientSiteColors', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    color1: {
      type: sequelize.STRING,
    },
    color1Light1: {
      type: sequelize.STRING,
    },
    color1Light2: {
      type: sequelize.STRING,
    },
    color1Light3: {
      type: sequelize.STRING,
    },
    color1Light4: {
      type: sequelize.STRING,
    },
    color1Dark1: {
      type: sequelize.STRING,
    },
    color1Dark2: {
      type: sequelize.STRING,
    },
    color1Dark3: {
      type: sequelize.STRING,
    },
    color1Dark4: {
      type: sequelize.STRING,
    },







    color2: {
      type: sequelize.STRING,
    },
    color2Light1: {
      type: sequelize.STRING,
    },
    color2Light2: {
      type: sequelize.STRING,
    },
    color2Light3: {
      type: sequelize.STRING,
    },
    color2Light4: {
      type: sequelize.STRING,
    },
    color2Dark1: {
      type: sequelize.STRING,
    },
    color2Dark2: {
      type: sequelize.STRING,
    },
    color2Dark3: {
      type: sequelize.STRING,
    },
    color2Dark4: {
      type: sequelize.STRING,
    },






    color3: {
      type: sequelize.STRING,
    },
    color3Light1: {
      type: sequelize.STRING,
    },
    color3Light2: {
      type: sequelize.STRING,
    },
    color3Light3: {
      type: sequelize.STRING,
    },
    color3Light4: {
      type: sequelize.STRING,
    },
    color3Dark1: {
      type: sequelize.STRING,
    },
    color3Dark2: {
      type: sequelize.STRING,
    },
    color3Dark3: {
      type: sequelize.STRING,
    },
    color3Dark4: {
      type: sequelize.STRING,
    },















    color4: {
      type: sequelize.STRING,
    },
    color4Light1: {
      type: sequelize.STRING,
    },
    color4Light2: {
      type: sequelize.STRING,
    },
    color4Light3: {
      type: sequelize.STRING,
    },
    color4Light4: {
      type: sequelize.STRING,
    },
    color4Dark1: {
      type: sequelize.STRING,
    },
    color4Dark2: {
      type: sequelize.STRING,
    },
    color4Dark3: {
      type: sequelize.STRING,
    },
    color4Dark4: {
      type: sequelize.STRING,
    },















    color5: {
      type: sequelize.STRING,
    },
    color5Light1: {
      type: sequelize.STRING,
    },
    color5Light2: {
      type: sequelize.STRING,
    },
    color5Light3: {
      type: sequelize.STRING,
    },
    color5Light4: {
      type: sequelize.STRING,
    },
    color5Dark1: {
      type: sequelize.STRING,
    },
    color5Dark2: {
      type: sequelize.STRING,
    },
    color5Dark3: {
      type: sequelize.STRING,
    },
    color5Dark4: {
      type: sequelize.STRING,
    },















    color6: {
      type: sequelize.STRING,
    },
    color6Light1: {
      type: sequelize.STRING,
    },
    color6Light2: {
      type: sequelize.STRING,
    },
    color6Light3: {
      type: sequelize.STRING,
    },
    color6Light4: {
      type: sequelize.STRING,
    },
    color6Dark1: {
      type: sequelize.STRING,
    },
    color6Dark2: {
      type: sequelize.STRING,
    },
    color6Dark3: {
      type: sequelize.STRING,
    },
    color6Dark4: {
      type: sequelize.STRING,
    },















    color7: {
      type: sequelize.STRING,
    },
    color7Light1: {
      type: sequelize.STRING,
    },
    color7Light2: {
      type: sequelize.STRING,
    },
    color7Light3: {
      type: sequelize.STRING,
    },
    color7Light4: {
      type: sequelize.STRING,
    },
    color7Dark1: {
      type: sequelize.STRING,
    },
    color7Dark2: {
      type: sequelize.STRING,
    },
    color7Dark3: {
      type: sequelize.STRING,
    },
    color7Dark4: {
      type: sequelize.STRING,
    },















    color8: {
      type: sequelize.STRING,
    },
    color8Light1: {
      type: sequelize.STRING,
    },
    color8Light2: {
      type: sequelize.STRING,
    },
    color8Light3: {
      type: sequelize.STRING,
    },
    color8Light4: {
      type: sequelize.STRING,
    },
    color8Dark1: {
      type: sequelize.STRING,
    },
    color8Dark2: {
      type: sequelize.STRING,
    },
    color8Dark3: {
      type: sequelize.STRING,
    },
    color8Dark4: {
      type: sequelize.STRING,
    },















    color9: {
      type: sequelize.STRING,
    },
    color9Light1: {
      type: sequelize.STRING,
    },
    color9Light2: {
      type: sequelize.STRING,
    },
    color9Light3: {
      type: sequelize.STRING,
    },
    color9Light4: {
      type: sequelize.STRING,
    },
    color9Dark1: {
      type: sequelize.STRING,
    },
    color9Dark2: {
      type: sequelize.STRING,
    },
    color9Dark3: {
      type: sequelize.STRING,
    },
    color9Dark4: {
      type: sequelize.STRING,
    },








    
    createdAt: {
      allowNull: false,
      type: sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: sequelize.DATE
    },
    deletedAt: {
      type: sequelize.DATE
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('clientSiteColors');
}

module.exports = { up, down };