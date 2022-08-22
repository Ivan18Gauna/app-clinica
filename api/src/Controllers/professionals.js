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
    const apiProf = await axios.get(`https://historia-clinica-31f40-default-rtdb.firebaseio.com/results.json`);
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
  const apiObras = await axios.get("https://obras-sociales-be310-default-rtdb.firebaseio.com/results.json");
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

const getAllProfessionals=async(req,res)=>{
  try{  
    let allProfessional = await Professionals.findAll({
    include: [{ model: Specialties,
    attributes:['name'] }],  
    limit:150,
    //offset: req.query.page,
    //order:[['name', req.query.order]],
    })
    res.status(200).send(allProfessional)
    } catch (error) {console.log(error)}
}

const getProfByName = async(req, res) => {
  let {lastname} = req.query
  let {filterEsp} = req.query
  let {filterProfProv}= req.query
  let {page}= req.query
  
  //***********FILTRO SE RECIBE APELLIDO Y NO SE RECIBE ESPECIALIDAD NI PROVINCIA
  if(lastname && !filterEsp && !filterProfProv){
    try {
        let dbProfName = await Professionals.findAll({
            include:[{model: Specialties,
            attributes:['name']}],
  
            where: {lastname: { [Op.iLike]: lastname +'%' }},                 
            limit: 9,
            //offset: req.query.page,
            //order:[['lastname', req.query.order]] 
          });     
                       
            dbProfName.length?
            res.status(200).send(dbProfName):res.status(404).send('No existe registro del profesional a buscar por apellido')
     } catch (error) {
    console.log(error)        
    }
    
  }
  //***********FILTRO SE RECIBE APELLIDO Y PROVINCIA NO SE RECIBE ESPECIALIDAD  
  if(lastname && !filterEsp && filterProfProv){
    try {
        let dbProfName = await Professionals.findAll({
            include:[{model: Specialties,
            attributes:['name']}],
            
            where: {
            [Op.and]:[
            {lastname: { [Op.iLike]: lastname +'%' }},                 
            {province: req.query.filterProfProv}]},
            limit: 9,
                                   
            //offset: req.query.page,
            //order:[['lastname', req.query.order]] 
          });     
                       
            dbProfName.length?
            res.status(200).send(dbProfName):res.status(404).send('No existe registro del profesional por apellido y provincia a buscar')
     } catch (error) {
    console.log(error)        
    }
    
  }
  //***********FILTRO SE RECIBE PROVINCIA NO SE RECIBE ESPECIALIDAD NI APELLIDO 
  if(!lastname && !filterEsp && filterProfProv)
  {
      try {
             let dbProfName = await Professionals.findAll({
                include: [{ model: Specialties,
                attributes:['name']
               }],     
                where:{province:req.query.filterProfProv},
                 limit: 5,
                 //offset: req.query.page,
                 //order:[['name', req.query.order]]//ASC DESC 
                });

              dbProfName.length?
              res.status(200).send(dbProfName):res.status(404).send('No existe registro del profesional en la provincia')
          } catch (error) {console.log(error)
  }}
  //***********FILTRO SE RECIBE ESPECIALIDAD NO SE RECIBE PROVINCIA NI APELLIDO 
  if (!lastname && filterEsp && !filterProfProv)
  {
      try {
              
          let dbPatfName = await Professionals.findAll({
          include: [{ model: Specialties,
            attributes:['name'],
            where:{name: req.query.filterEsp}}],      
            limit: 5,
            //offset: req.query.page,
           //order:[['name', req.query.order]]//ASC DESC
          });//ASC DESC
            dbPatfName.length?
            res.status(200).send(dbPatfName):res.status(404).send('No existe registro del profesional en la especialidad a buscar')
          } catch (error) {console.log(error)}
  }
  //***********FILTRO SE RECIBE ESPECIALIDAD  Y PROVINCIA NO SE RECIBE APELLIDO 
    
  if (!lastname && filterEsp && filterProfProv)
  {
      try {
              
          let dbPatfName = await Professionals.findAll({
            where:{province:req.query.filterProfProv},
            include: [{ model: Specialties,
        
            attributes:['name'],
            where:{name: req.query.filterEsp} 
          }],      
            });//ASC DESC
            dbPatfName.length?
            res.status(200).send(dbPatfName):res.status(404).send('No existe registro del profesional a buscar en la Especialidad y Provincia')
          } catch (error) {console.log(error)}
  }
  //***********SE RECIBE ESPECIALIDAD, PROVINCIA, APELLIDO 
  if (lastname && filterEsp && filterProfProv)
  {
      try {
              
          let dbPatfName = await Professionals.findAll({
            
            where: {
              [Op.and]:[
              {lastname: { [Op.iLike]: lastname +'%' }},                 
              {province: req.query.filterProfProv}]},

            include: [{ model: Specialties,
        
            attributes:['name'],
            where:{name: req.query.filterEsp
            } 
            }],      
            });//ASC DESC
            
            dbPatfName.length?
              res.status(200).send(dbPatfName):res.status(404).send('No existe registro del profesional con el apellido, especialidad y provincia a buscar')
            } catch (error) {console.log(error)}
  }
  else if(!req.query.lastname && !req.query.filterProfProv && !req.query.filterEsp){
    try{
      res.status(404).send('Debe seleccionar un valor a consultar')

    }
    catch (error){
      res.status(200).send('Debe seleccionar un filtro a consultar')
    }
    }
  }

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
  getProfByName,
  getAllProfessionals,
  getProfById,
  postProfessionals,
  putProfessionals,
  getObrasSociales,
  addProfDb,
};
