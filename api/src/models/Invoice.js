const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('invoice',{
        payment_id:{
            type:DataTypes.INTEGER,
            defaultValue: 0,
        },
        payment_status:{
            type: DataTypes.STRING,
            defaultValue: '',
        },
        date: {
            type: DataTypes.DATEONLY
        },
        price: {
            type: DataTypes.INTEGER
        },
        saldado: {
            type: DataTypes.BOOLEAN
        },
        plan: {
            type:DataTypes.ENUM('gol', 'standar', 'premmium'),

        },
        status:{
            type:DataTypes.ENUM('creado', 'procesando', 'cancelado', 'pagado'),
            allowNull:false,
        },
    },
    {
        timestamps : false
    })
}