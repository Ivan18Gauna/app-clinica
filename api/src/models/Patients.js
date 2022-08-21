const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('patients', {
    id: {
    type:DataTypes.STRING,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
  name: {
       type: DataTypes.STRING,
       primaryKey: true,
       allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  document: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  birth: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  phone: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  mail: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  province: {
      type: DataTypes.STRING,
      allowNull: false
  },
  city: {
      type: DataTypes.STRING,
      allowNull: false
  },
  number: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  street: {
      type: DataTypes.STRING,
      allowNull: false
  },
  paranoid: true,
  });
};