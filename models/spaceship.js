const Sequelize = require('sequelize');

module.exports = class Spaceship extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // shipName: {
        //   type: Sequelize.STRING(140),
        //   allowNull: false,
        // },
        // speed: {
        //   type: Sequelize.STRING(200),
        //   allowNull: false,
        // },
        // bulletNumber: {
        //   type: Sequelize.STRING(200),
        //   allowNull: false,
        // },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Spaceship',
        tableName: 'spaceships',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Spaceship.belongsTo(db.User);
    db.Spaceship.belongsTo(db.Shipdata, {
      targetKey: 'shipName',
      foreignKey: 'shipName',
    });
  }
};
