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
        merchant_order_id:{
            type: DataTypes.BIGINT,
            defaultValue: 0,
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
        status:{
            type:DataTypes.ENUM('created', 'processing', 'cancelled', 'paid'),
            allowNull:false,
        },
    },
    {
        timestamps : false
    })
}