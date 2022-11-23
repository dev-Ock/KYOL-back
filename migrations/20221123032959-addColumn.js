"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      await queryInterface.addColumn("Posts", "UserId", {
        type: Sequelize.INTEGER(40),
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),

      await queryInterface.addColumn("Comments", "PostId", {
        type: Sequelize.INTEGER(40),
        references: {
          model: "posts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),

      await queryInterface.addColumn("Postlikes", "UserId", {
        type: Sequelize.INTEGER(40),
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),

      await queryInterface.addColumn("Postlikes", "PostId", {
        type: Sequelize.INTEGER(40),
        references: {
          model: "posts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    ];
  },

  async down(queryInterface, Sequelize) {
    return [
      await queryInterface.removeColumn("Posts", "UserId"),
      await queryInterface.removeColumn("Comments", "PostId"),
      await queryInterface.removeColumn("Postlikes", "UserId"),
      await queryInterface.removeColumn("Postlikes", "PostId"),
    ];
  },
};
