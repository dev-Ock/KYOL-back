const Sequelize = require("sequelize");

module.exports = class Score extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        score: {
          type: Sequelize.NUMBER(40),
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
        modelName: "Score",
        tableName: "scores",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Score.belongsTo(db.User);
  }
};
