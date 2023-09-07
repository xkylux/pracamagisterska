const bcrypt = require("bcryptjs")
const ObjectId = require("mongodb").ObjectId;

const userSeeder = [
  {
    name: 'admin',
    lastName: 'admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('admin@gmail.com', 10),
    isAdmin: true,
  },
  {
    _id: ObjectId("646c7f17bebd7c027309a965"),
    name: 'Krzysztof',
    lastName: 'Kolasinski',
    email: 'kolkielce@wp.pl',
    password: bcrypt.hashSync('kolkielce@wp.pl', 10),
  },
]

module.exports = userSeeder
