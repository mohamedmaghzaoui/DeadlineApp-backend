//create user table using sequelize
module.exports = (sequelize, datatypes) => {
  const Users = sequelize.define("Users", {
    name: {
      type: datatypes.STRING,
      allowNull: false,
    },
    email: {
      type: datatypes.STRING,
      allowNull: false,
      unique: true, // unique email for each user
    },
    hashedPassword: {
      type: datatypes.TEXT,
      allowNull: false,
    },
    role: {
      type: datatypes.STRING,
      allowNull: false,
    },
  });
  return Users;
};
