const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {

      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Postlike",
        tableName: "postlikes",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Postlike.belongsTo(db.Post, { onDelete: "CASCADE" });
    db.Postlike.belongsTo(db.User, { onDelete: "CASCADE" });
  }
};
