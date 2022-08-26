// const { Invoice, Usuario, Professional} = require("../db")

// const getFacturaByPacienteID = async (req, res) => {
//     const { id } = req.params;
//     try {
              
//         const professionals = await Professionals.findOne({
//             include: [{ model: Specialties,
//               attributes:['name'] }],  
//             where: {
//               id: id,
//             },
//           });
        
//         const invoice = await Invoice.findAll({
//         where: {
//             pacienteId: usuario.paciente.id
//         },
//         include: [{model: Paciente, include: [{model: Usuario, attributes: ["name", "lastname", "email", "telephone"]}]}, {model: Psicologo, include: [{model: Usuario, attributes: ["name", "lastname", "email", "telephone"]}]}]
//         });
//         if (!factura) {
//         return res.status(404).send({ error: "Factura no encontrada" });
//         }
//         return res.send(factura);
//     } catch (error) {
//         res.status(404).send({ error: error.message })
//     }
// }

//Revisar la funcion hasta cuando se implemente
// const getFacturaByProfessionalID = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const usuario = await User.findByPk(id, {include: {model: Professional, attributes: ["id"]}});
//         const factura = await Invoice.findAll({
//         where: {
//             professionalsId: usuario.professionals.id
//         },
//         include: [{model: Professionals, include: [{model: User, attributes: ["name", "lastname", "email", "telephone"]}]}, 
//         {model: Paciente, include: [{model: Usuario, attributes: ["name", "lastname", "email", "telephone"]}]}]
//         });
//         if (!factura) {
//         return res.status(404).send({ error: "Factura no encontrada" });
//         }
//         return res.send(factura);
//     } catch (error) {
//         res.status(404).send({ error: error.message })
//     }
// }

const getAllInvoices = async (req, res) => {
    try {
        const factura = await Invoice.findAll({ attributes: ["price", "date"]});
        if (!factura) {
        return res.status(404).send({ error: "Factura no encontrada" });
        }
        const facturaLength = factura.length
        const sumaFacturas = factura.reduce((acc, curr) => acc + curr.price, 0);
        return res.send([{sumaFacturas}, factura, facturaLength]);
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
}

module.exports = { getAllInvoices }