'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('organization', 'address', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('organization', 'industry', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('organization', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('organization', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('organization', 'address');
    await queryInterface.removeColumn('organization', 'industry');
    await queryInterface.removeColumn('organization', 'email');
    await queryInterface.removeColumn('organization', 'phoneNumber');
  },
};
