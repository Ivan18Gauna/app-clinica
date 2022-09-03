 const { Invoice, Usuario, Professionals} = require("../db")



//Revisar la funcion hasta cuando se implemente
// const getFacturaByProfessionalID = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const professionalId = await Professionals.findByPk(id);
//         const factura = await Invoice.findAll({
//         where: {
//             professionalsId: professionalId.id
//         },
//         include: [{model: Professionals } ]})
//         if (!factura) {
//         return res.status(404).send({ error: "Factura no encontrada" });
//         }
//         return res.send(factura);
//     } catch (error) {
//         res.status(404).send({ error: error.message })
//     }
// }

const getFacturaByProfessionalID = async (req, res) => {
    let { id } = req.params;
    let dbProfId = await Professionals.findOne({
      where: { id },
      include: [
        {
          model: Invoice,
          //attributes: ["name"],
          //through: { attributes: [] },
        }
      ],
    });
    res.status(200).send(dbProfId);
  };
  




const getAllInvoices = async (req, res) => {
    try {
        const factura = await Invoice.findAll({
            include: [
                {
                    model: Professionals,
                    attributes: ['name','license'],
                    
                }]
        });
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

module.exports = { getAllInvoices, getFacturaByProfessionalID }