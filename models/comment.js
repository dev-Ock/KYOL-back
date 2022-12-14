const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        reply: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        nick: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        UserId: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Comment",
        tableName: "comments",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.Post);
    db.Comment.hasMany(db.Recomment, {
      onDelete: "CASCADE",
      hooks: true,
    });
  }
};
