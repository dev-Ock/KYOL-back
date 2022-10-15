const Sequelize = require("sequelize");

module.exports = class Shipdata extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        shipName: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
        speed: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        bulletNumber: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Shipdata",
        tableName: "shipdatas",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Shipdata.hasMany(db.Spaceship, {
      sourceKey: "shipName",
      foreignKey: "shipName",
    });
  }
};
