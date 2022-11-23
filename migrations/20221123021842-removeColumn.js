"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      await queryInterface.removeColumn("Posts", "UserId"),
      await queryInterface.removeColumn("Comments", "PostId"),
      await queryInterface.removeColumn("Postlikes", "UserId"),
      await queryInterface.removeColumn("Postlikes", "PostId"),
    ];
  },

  async down(queryInterface, Sequelize) {},
};
