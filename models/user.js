module.exports = (sequelize, datatypes) => {
  const Users = sequelize.define("Users", {
    name: {
      type: datatypes.STRING,
      allowNull: false,
    },
    email: {
      type: datatypes.STRING,
      allowNull: false,
      unique: true, // Add the unique constraint
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
