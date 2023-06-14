const bcrypt = require("bcrypt");

const users = [
  {
    id: 1,
    name: "admin",
    email: "admin@example.com",
    password: "password",
    role: "admin",
  },
  {
    id: 2,
    name: "user",
    email: "user@example.com",
    password: "password",
    role: "user",
  },
];

const getUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { getUserByEmail, getUserById, validatePassword };
