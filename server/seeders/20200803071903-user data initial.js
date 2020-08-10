'use strict';
const { hashPass } = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        email: 'dian@mail.com',
        password: hashPass('secret'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'kisra@mail.com',
        password: hashPass('secret'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
