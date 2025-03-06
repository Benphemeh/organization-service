'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Add the column allowing NULL values first
    await queryInterface.addColumn('organization', 'password', {
      type: Sequelize.STRING,
      allowNull: true, // Allow NULL initially to prevent errors
    });

    // Step 2: Update existing records with a default password (or any other logic)
    await queryInterface.sequelize.query(
      `UPDATE "organization" SET "password" = 'defaultpassword' WHERE "password" IS NULL;`,
    );

    // Step 3: Alter the column to NOT NULL after updating existing records
    await queryInterface.changeColumn('organization', 'password', {
      type: Sequelize.STRING,
      allowNull: false, // Now make it required
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the password column if rolling back
    await queryInterface.removeColumn('organization', 'password');
  },
};
