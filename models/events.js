//create event table using sequelize
module.exports = (sequelize, datatypes) => {
  const Events = sequelize.define("Events", {
    //table attributes
    title: {
      type: datatypes.STRING,
      allowNull: false,
    },
    object: {
      type: datatypes.STRING,
      allowNull: false,
    },
    client: {
      type: datatypes.STRING,
      allowNull: false,
    },
    concernedPerson: {
      type: datatypes.STRING,
      allowNull: false,
    },
    frequence: {
      type: datatypes.STRING,
      allowNull: false,
    },
    color: {
      type: datatypes.STRING,
      allowNull: false,
    },
    start: {
      type: datatypes.DATE,
      allowNull: false,
    },
    end: {
      type: datatypes.DATE,
      allowNull: false,
    },
  });
  return Events;
};
