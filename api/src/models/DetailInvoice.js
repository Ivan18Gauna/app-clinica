const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('detailInvoice',{
        fecha : {
            type : DataTypes.DATE,
            allowNull : false
        },
        hora : {
            type: DataTypes.TIME,
            allowNull: false
        },
        methodPaid: {
            type: DataTypes.STRING,
            allowNull: false
        },
     },
    {
        timestamps : false
    })
}