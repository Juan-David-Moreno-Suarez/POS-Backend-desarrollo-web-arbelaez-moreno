const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

module.exports = {
  async up(queryInterface) {
    const usuarios = await Promise.all([
      {
        username: 'admin',
        email: 'admin@test.com',
        password: await bcrypt.hash('admin123', SALT_ROUNDS),
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'juan',
        email: 'juan@test.com',
        password: await bcrypt.hash('juan123', SALT_ROUNDS),
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Usuarios', usuarios);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  },
};