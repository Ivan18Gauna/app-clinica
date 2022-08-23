const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('historiaClinica', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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
