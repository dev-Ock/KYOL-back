const Sequelize = require("sequelize");

module.exports = class Recomment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        re_reply: {
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
        modelName: "Recomment",
        tableName: "recomments",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Recomment.belongsTo(db.Comment, { onDelete: "CASCADE" });
  }
};
