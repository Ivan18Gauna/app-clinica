const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('healthData', {
    blood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vaccines: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    allergies: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    transfusion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    chronicles: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    oS: {
        type: DataTypes.STRING,
        allowNull: false,
        },  
  });
};








