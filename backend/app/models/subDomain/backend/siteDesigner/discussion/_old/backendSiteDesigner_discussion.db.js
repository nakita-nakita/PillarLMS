const load = (db) => {
  // //course discussion
  db.backendSiteDesigner_discussion = require("./backendSiteDesigner_discussion.model")(db.sequelize, db.Sequelize)
  db.backendSiteDesigner_discussionComment = require("./backendSiteDesigner_discussionComment.model")(db.sequelize, db.Sequelize)
  db.backendSiteDesigner_discussionVote = require("./backendSiteDesigner_discussionVote.model")(db.sequelize, db.Sequelize)
}

const connect = (db) => {

  // users have discussion
  db.backendUser.hasMany(db.backendSiteDesigner_discussion, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  });
  db.backendSiteDesigner_discussion.belongsTo(db.backendUser, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  })

  // Vote is many to many between backend user and discussion
  db.backendUser.hasMany(db.backendSiteDesigner_discussionVote, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  });
  db.backendSiteDesigner_discussionVote.belongsTo(db.backendUser, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  })

  db.backendSiteDesigner_discussion.hasMany(db.backendSiteDesigner_discussionVote, {
    foreignKey: {
      name: 'backendSiteDesigner_discussionId',
      allowNull: false
    },
  });
  db.backendSiteDesigner_discussionVote.belongsTo(db.backendSiteDesigner_discussion, {
    foreignKey: {
      name: 'backendSiteDesigner_discussionId',
      allowNull: false
    },
  })

  // comments is a many to many between backend users and discussions
  db.backendUser.hasMany(db.backendSiteDesigner_discussionComment, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  });
  db.backendSiteDesigner_discussionComment.belongsTo(db.backendUser, {
    foreignKey: {
      name: 'backendUserId',
      allowNull: false
    },
  })

  db.backendSiteDesigner_discussion.hasMany(db.backendSiteDesigner_discussionComment, {
    foreignKey: {
      name: 'backendSiteDesigner_discussionId',
      allowNull: false
    },
  });
  db.backendSiteDesigner_discussionComment.belongsTo(db.backendSiteDesigner_discussion, {
    foreignKey: {
      name: 'backendSiteDesigner_discussionId',
      allowNull: false
    },
  })
}

module.exports = {
  load,
  connect,
}