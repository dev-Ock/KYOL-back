"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      await queryInterface.changeColumn("Posts", "count", {
        type: Sequelize.INTEGER(40),
        allowNull: false,
        defaultValue: 0,
      }),

      await queryInterface.changeColumn("Posts", "like", {
        type: Sequelize.INTEGER(40),
        allowNull: false,
        defaultValue: 0,
      }),
    ];
  },

  async down(queryInterface, Sequelize) {},
};
