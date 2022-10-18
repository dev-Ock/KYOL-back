const Sequelize = require("sequelize");

module.exports = class Score extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        score: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
        },
        usedShip: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Scoredata",
        tableName: "scoredatas",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Scoredata.belongsTo(db.User);
  }
};
