const Sequelize = require("sequelize");
const axios = require("axios");
const { Op } = require("sequelize");
const { User } = require("../db");

const registerNewAdmin = async(req, res) => {
    let { name, lastname, email, password, phone } = req.body;
    try {
        const newAdmin = await User.create({
            name,
            lastname,
            email,
            password,
            phone
        })
        res.status(200).send(newAdmin)
    } catch (error) {
        res.status(400).send('Hubo un error creando el nuevo admin')
    }
}

module.exports = {
    registerNewAdmin
}