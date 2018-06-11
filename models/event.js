module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    type: DataTypes.STRING,
  });

  return Event;
};
