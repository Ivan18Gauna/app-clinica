const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { Professionals, Specialties, ObrasSociales } = require("../db");
const { query } = require("express");

const getInfoApi = async (req, res) => {
  res.status(200).send(
    await Professionals.findAll({
      include: [{ model: Specialties }],
    })
  );
};

const addProfDb = async () => {
  const dbProf = await Professionals.findAll();
  if (!dbProf.length) {
    const apiProf = await axios.get(
      `https://historia-clinica-31f40-default-rtdb.firebaseio.com/results.json`
    );
    const prof = await apiProf.data;
    prof.forEach((e) => {
      Specialties.findOrCreate({
        where: {
          name: e.specialty[0],
        },
      });
    });
    await prof.forEach(async (e) => {
      let idv4 = uuidv4();
      let dbId = idv4.slice(0, 4);
      const dbProf = {
        id: dbId,
        name: e.name.split(" ")[0],
        lastname: e.name.split(" ")[1],
        license: e.license,
        birth: e.birth,
        phone: e.phone,
        mail: e.mail,
        province: e.domicile.province,
        city: e.domicile.city,
        number: e.domicile.number,
        street: e.domicile.street,
      };
      const newProf = await Professionals.create(dbProf);
      e.specialty.map(async (s) => {
        const [postSpecialties, succes] = await Specialties.findOrCreate({
          where: {
            name: s,
          },
          defaults: {
            name: s,
          },
        });
        await newProf.addSpecialties(postSpecialties);
      });
      const [postObrasSociales, succes] = await ObrasSociales.findOrCreate({
        where: {
          name: e.obra,
        },
        defaults: {
          name: e.obra,
        },
      });
      await newProf.addObrasSociales(postObrasSociales);
    });
    console.log("profesionales cargados correctamente");
  }
};

const getObrasSociales = async () => {
  const apiObras = await axios.get(
    "https://obras-sociales-be310-default-rtdb.firebaseio.com/results.json"
  );
  const obras = await apiObras.data;
  obras.forEach(async (e) => {
    await ObrasSociales.findOrCreate({
      where: {
        name: e,
      },
    });
  });
  console.log("obras cargadas con exito");
};

const getProfById = async (req, res) => {
  let { id } = req.params;
  const dbProfId = await Professionals.findOne({
    where: {
      id: id,
    },
  });
  res.status(200).send(dbProfId);
};

const getProfByName = async(req, res) => {
  let {lastname} = req.query
  let {filterEsp} = req.query
  let {filterProfProv}= req.query
  let {page}= req.query
  //console.log({lastname})
  //solo se recibe nombre y no recibe especialidad ni provincia
  if(lastname && !filterEsp && !filterProfProv){
    try {
        let dbProfName = await Professionals.findAll({
            //include:[{model: Specialties,
            //attributes:['name']}],
            where: {lastname: { [Op.iLike]: lastname +'%' }},                 
            limit: 5,
            //offset: req.query.page,
            //order:[['lastname', req.query.order]] 
          });     
                       
            dbProfName.length?
            res.status(200).send(dbProfName):res.status(404).send('No existe registro del profesional a buscar')
     } catch (error) {
    console.log(error)        
    }
    
  }
  // recibe nombre y provincia pero no recibe especialidad
  if(lastname && !filterEsp && filterProfProv){
    try {
        let dbProfName = await Professionals.findAll({
            //include:[{model: Specialties,
            //attributes:['name']}],
            
            where: {
            [Op.and]:[
            {lastname: { [Op.iLike]: lastname +'%' }},                 
            {province: req.query.filterProfProv}]},
            limit: 5,
                                   
            //offset: req.query.page,
            //order:[['lastname', req.query.order]] 
          });     
                       
            dbProfName.length?
            res.status(200).send(dbProfName):res.status(404).send('No existe registro del profesional a buscar')
     } catch (error) {
    console.log(error)        
    }
    
  }
  //Cuando recibe solo provincia pero no recibe ni apellido ni filtro Especialidad
  if(!lastname && !filterEsp && filterProfProv)
  {
      try {
             let dbProfName = await Professionals.findAll({
                //include: [{ model: Specialties,
                //attributes:['name']
               //}],     
                where:{province:req.query.filterProfProv},
                 limit: 5,
                 //offset: req.query.page,
                 //order:[['name', req.query.order]]//ASC DESC 
                });

              dbProfName.length?
              res.status(200).send(dbProfName):res.status(404).send('No existe registro del profesional a buscar')
          } catch (error) {console.log(error)
  }}
  //Cuando recibe solo Especialidad pero no recibe ni apellido ni filtro Provincia

  if (!lastname && filterEsp && !filterProfProv)
  {
      try {
              
          let dbPatfName = await Professionals.findAll({
          include: [{ model: Specialties,
            attributes:['name'],
            where:{name: req.query.filterEsp
             // attributes:['name', req.query.name]  
            } 
            
             // where:{name:req.query.filterEsp}
             
              
               }],      
            //where:{name:req.query.filterEsp}, 
            //include: [{ model: Professionals}],
            //include:[{model: Specialties,
            //attributes:['name']}],

                });//ASC DESC
            //  console.log(dbPatfName)
            //  let filterEsp = dbPatfName.map(e => e.professionals)
            dbPatfName.length?
              res.status(200).send(dbPatfName):res.status(404).send('No existe registro del profesional a buscar')
             // return res.send(filterEsp.flat())
          } catch (error) {console.log(error)}
  }
  
  //Cuando recibe solo especialidad pero no recibe ni apellido ni filtro apellido
  //=====================solo prueba 

  // if (!lastname && filterEsp && !filterProfProv)
  // {
  //     try {
              
  //         let dbPatfName = await Specialties.findAll({
  //           //include: [{ model: Professionals,
  //          //   attributes:['name'] }],      
  //           where:{name:req.query.filterEsp}, 
  //           include: [{ model: Professionals}],
  //           //include:[{model: Specialties,
  //           //attributes:['name']}],

  //               });//ASC DESC
  //             console.log(dbPatfName)
  //             let filterEsp = dbPatfName.map(e => e.professionals)
  //              filterEsp.length?
  //             res.status(200).send(filterEsp.flat()):res.status(404).send('No existe registro del profesional a buscar')

  //            // return res.send(filterEsp.flat())
  //         } catch (error) {console.log(error)}
  // }
  
  //Cuando recibe solo especialidad y apellido pero no recibe provincia
    //=============================aqui termina la prueba la funcion debe estar comentada la funcion valida es la de abajo
  //Cuando recibe solo especialidad y provincia pero no recibe lastname
  if (!lastname && filterEsp && filterProfProv)
  {
      try {
              
          let dbPatfName = await Specialties.findAll({
            //include: [{ model: Professionals,
           //   attributes:['name'] }],      
            where:{name:req.query.filterEsp}, 
            include: [{ model: Professionals}],
            
            //include:[{model: Specialties,
            //attributes:['name']}],

                });//ASC DESC
              //console.log(dbPatfName)
              let filterEsp = dbPatfName.map(e => e.professionals)
              console.log(dbPatfName)
              filterEsp.flat()
              let fiterEspName =filterEsp.filter(e=>e.province == req.query.filterProfProv)
              fiterEspName.length?
              res.status(200).send(fiterEspName):res.status(404).send('No existe registro del profesional a buscar')

             // return res.send(filterEsp.flat())
          } catch (error) {console.log(error)}
  }
  

  // else if(req.query.lastname && req.query.filterProfProv){
  //   try {
  //     let dbProfName = await Professionals.findAll({
  //         include:[{model: Specialties,
  //         attributes:['name']}],
  //         where: {
  //           [Op.and]:[
  //           {lastname: { [Op.iLike]: lastname +'%' }}, 
  //           {province: req.query.filterProfProv}]},                 
  //         limit: 100,
  //         offset: req.query.page,
  //         order:[['lastname', req.query.order]] });     
                       
  //         dbProfName.length?
  //         res.status(200).send(dbProfName):res.status(404).send('No existe registro del profesional a buscarlos')
  //  } catch (error) {
  // console.log(error)        
  // }
  //}
  else if(!req.query.lastname && !req.query.filterProfProv && !req.query.filterEsp){
    try{
      res.status(404).send('Debe seleccionar un valor a consultar')

    }
    catch (error){
      res.status(200).send('Debe seleccionar un filtro a consultar')
    }
    }

  

//  else{
//       try {
//               let allProfessional = await Professionals.findAll({
//                 include: [{ model: Specialties,
//                 attributes:['name'] }],  

//                   limit:15,
//                   offset: req.query.page,
//                   filterProfProv:[['province', req.query.filterProfProv]],
//                   filterEsp:[['city', req.query.filterEsp]],
//                   order:[['name', req.query.order]],

//               });
           
//                res.status(200).send(allProfessional);
//           } catch (error) {console.log(error)}
//       }     
}


// const getProfByName = async (req, res) => {
//   let { name } = req.params;
//   const dbProfName = await Professionals.findAll({
//     where: {
//       name: { [Op.iLike]: name + "%" },
//     },
//   });
//   res.status(200).send(dbProfName);
// };

// const getFilterByCity = async (req, res) => {
//   let { filterCity } = req.params;

//   const dbFilterCity = await Professionals.findAll({
//     where: {
//       city: req.params.filterCity,
//     },
//     // order:[['name', req.params.order]]
//   });

//   res.status(200).send(dbFilterCity);
// };
const postProfessionals = async (req, res) => {
  let {
    name,
    license,
    birth,
    phone,
    mail,
    province,
    city,
    number,
    street,
    specialty,
  } = req.body;
  let idv4 = uuidv4();
  const dbId = idv4.slice(0, 4);
  try {
    const professional = {
      id: dbId,
      name: name,
      license: license,
      birth: birth,
      phone: phone,
      mail: mail,
      province: province,
      city: city,
      number: number,
      street: street,
    };
    if (isNaN(name) === false)
      return res.send("El valor ingresado no debe ser numerico.");
    if (
      !name ||
      !license ||
      !birth ||
      !phone ||
      !mail ||
      !province ||
      !city ||
      !number ||
      !street
    ) {
      res.send("Falta infornacion");
    }
    const validate = await Professionals.findOne({
      where: { name },
    });
    if (!validate) {
      let newProfessional = await Professionals.create(professional);
      specialty.map(async (s) => {
        const [postSpecialties, succes] = await Specialties.findOrCreate({
          where: {
            name: s,
          },
          defaults: {
            name: s,
          },
        });
        await newProfessional.addSpecialties(postSpecialties);
      });
      res.status(200).send(professional);
    } else {
      res.status(400).send("Professional ya existente");
    }
  } catch (error) {
    console.log(error);
  }
};

const putProfessionals = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      license,
      birth,
      phone,
      mail,
      province,
      city,
      number,
      street,
    } = req.body;
    const editProfessionals = await Professionals.update(
      {
        name,
        license,
        birth,
        phone,
        mail,
        province,
        city,
        number,
        street,
      },
      { where: { id: id } }
    );
    res.send(editProfessionals);
  } catch (error) {
    return error;
  }
};

module.exports = {
  getInfoApi,
  //getProfByName,
  getProfByName,
  getProfById,
  postProfessionals,
  //getFilterByCity,
  putProfessionals,
  getObrasSociales,
  addProfDb,
};
