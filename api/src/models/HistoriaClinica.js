const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('historiaClinica', {
    id: {
      type:DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },  
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      diagnosis: {
          type: DataTypes.STRING,
          allowNull: false,
        },
  },
  {
    createdAt: false,
    updatedAt: false,
  });
};
