const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('patients', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },  
  name: {
    type: DataTypes.STRING,
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
  blood: {
    type: DataTypes.STRING,
  },
  vaccines: {
      type: DataTypes.STRING,
  },
  allergies: {
      type: DataTypes.STRING,
    },
  transfusion: {
      type: DataTypes.STRING,
    },
  chronicles: {
      type: DataTypes.STRING,
    },
  oS: {
      type: DataTypes.STRING,
      },  
    },
  {
    createdAt: false,
    updatedAt: false,
    deletedAt: 'deletedAt',
    paranoid: true,
    timestamps: true,
  });
};