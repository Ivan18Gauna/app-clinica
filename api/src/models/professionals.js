const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('professionals', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    name: {
         type: DataTypes.STRING,
        allowNull: false,
    },
    license: {
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
    domicile: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
};