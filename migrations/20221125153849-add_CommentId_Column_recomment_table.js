"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Recomments", "CommentId", {
      type: Sequelize.INTEGER(40),
      references: {
        model: "comments",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Recomments", "CommentId");
  },
};
