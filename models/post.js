const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        nick: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        count: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
          defaultValue: 0,
        },
        like: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Postlike, {
      onDelete: "CASCADE",
      hooks: true,
    });
    db.Post.hasMany(db.Comment, { onDelete: "CASCADE", hooks: true });
    db.Post.hasMany(db.Recomment, { onDelete: "CASCADE", hooks: true });
  }
};
