const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('healthData', {
    id: {
        type:DataTypes.STRING,
          defaultValue: UUIDV4,
          primaryKey: true,
          allowNull: false,
        },  
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








