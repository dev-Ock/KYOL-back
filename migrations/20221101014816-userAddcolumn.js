'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'type', {
      type: Sequelize.ENUM('free', 'premium'),
      allowNull: false,
      defaultValue: 'premium',
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'type');
  },
};
