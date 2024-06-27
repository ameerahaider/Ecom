// seed.js
const sequelize = require('./config/db');
const Category = require('./models/category');
const Product = require('./models/product');
const User = require('./models/user');
const faker = require('faker');

async function seed() {
  await sequelize.sync({ force: true });

  const categories = ['winter', 'summer', 'spring', 'autumn'];
  for (const name of categories) {
    await Category.create({ name });
  }

  for (let i = 0; i < 20; i++) {
    await Product.create({
      name: faker.commerce.productName(),
      categoryId: faker.random.arrayElement([1, 2, 3, 4]),
    });
  }

  console.log('Database seeded!');
}

seed();
