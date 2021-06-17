const express = require("express");
const { authAdmin, checkToken } = require("../middleware");
const Beach = require("../models/Beach");
const SportEquipment = require("../models/SportEquipment");
const BeachRouter = express.Router();

// GET todas las playas                                 
BeachRouter.get("/", async (req, res, next) => {
    try {

        let beaches = await Beach.find({});         

        return res.json({                                      
            success: true,
            beaches
        });

    } catch (error) {
        return next({
            status: 403,
            message: err.message

        })
    }
});

//mostrar info de una playa
BeachRouter.get("/find/:id", async (req, res, next) => {         
    try {


        const { id } = req.params                               

        //const id = req.params.id 

        let beach = await Beach.findById(id).populate("equipmentAvailable.sportEquipment");  
       

        return res.json({
            success: true,
            beach
        });

    } catch (error) {
        return next({
            status: 403,
            message: err.message

        });
    };
});

//Añadir equipamiento a una playa                          
BeachRouter.put("/addEquipment", checkToken, authAdmin, async (req, res, next) => {
    try {

        const { beachId, equipmentId, stock } = req.body;       

        let playa = await Beach.findById(beachId)       
        
        let findEquipment= await playa.equipmentAvailable.find(equipment => {
           return equipment.sportEquipment == equipmentId
        });

        if (findEquipment) {
            return next({
                status: 403,
                message: "This equipment already exists"
            });
        };

        let object = {                                          
            sportEquipment: equipmentId,                        
            stock
        }

        playa.equipmentAvailable.push(object);                  

        let playaActualizada = await playa.save();              
        return res.json({                                       
            success: true,
            beach: playaActualizada
        });

    } catch (error) {
        return next({
            status: 403,
            message: err.message

        });
    };

})

//Añadir stock de equipamiento a una playa
BeachRouter.put("/addEquipment/stock", checkToken, authAdmin, async (req, res, next) => {            
    try {

        const { beachId, equipmentId, stock } = req.body;

        let playa = await Beach.findById(beachId);
        let material = playa.equipmentAvailable.find(equipment => {
            return equipment.sportEquipment == equipmentId
        })

        if (!material) {                                                            
            return next({
                status: 403,                                                     
                message: "Este material no existe en esta playa"
            })
        }

        material.stock += parseFloat(stock);


        let nuevaPlaya = await playa.save()
        return res.json({
            success: true,
            playa: nuevaPlaya
        });

    } catch (error) {
        return next({
            status: 403,
            message: err.message

        });
    };

});

//Eliminar stock de equipamiento a una playa
BeachRouter.put("/removeEquipment/stock",checkToken, authAdmin, async (req, res, next) => {
    try {


        const { beachId, equipmentId, stock } = req.body;

        let playa = await Beach.findById(beachId);
        let material = playa.equipmentAvailable.find(equipment => {
            return equipment.sportEquipment == equipmentId
        })

        if (!material) {
            return next({
                status: 403,
                message: "Este material no existe en esta playa"
            })
        }

        material.stock -= parseFloat(stock);


        let nuevaPlaya = await playa.save()
        return res.json({
            success: true,
            playa: nuevaPlaya
        });

    } catch (error) {
        return next({
            status: 403,
            message: err.message

        });
    };

});

//Eliminar playa

BeachRouter.delete("/deleteBeach/:id",checkToken, authAdmin, async (req, res, next) => {
    try {


        const { id } = req.params
        const { beachId } = req.body;

        let playa = await Beach.findById(id);

        let borrarPlaya = await playa.deleteOne({ "_id": beachId });

        borrarPlaya.save()


        return res.json({
            success: true,
            message: "Playa eliminada correctamente"
        });

    } catch (error) {
        return next({
            status: 403,
            message: error.message

        });
    };

});

//Eliminar material concreto de una playa

BeachRouter.put("/removeEquipment/:id",checkToken, authAdmin, async (req, res, next) => {
    try {


        const { id } = req.params;                                              //id de la playa
        const { sportEquipment_id } = req.body;                                 //_id del objeto

        if (!sportEquipment_id) {
            return next({
                status: 403,
                message: "introduce el _id"
            })
        }

        let beach = await Beach.findById(id)

        const index = beach.equipmentAvailable.findIndex(equipment => {         

            if (equipment._id == sportEquipment_id) {                            
                return true
            }

            return false
        })


        if (index > -1) {
            beach.equipmentAvailable.splice(index, 1);
        }

        beach.save()
            .then(newBeach => {
                return res.json({
                    success: true,
                    beach: newBeach,
                    message: "Material actualizado correctamente"
                });
            });

    } catch (error) {
        return next({
            status: 403,
            message: err.message

        });
    };

});

//Crear una playa

BeachRouter.post("/newBeach", checkToken, authAdmin, async (req, res, next) => {

    try {

        const { name, location } = req.body;

        if (!name || !location) {
            return next({
                status: 403,
                message: "rellena todos los campos"
            })
        }

        let beach = new Beach({
            name,
            location,
            equipmentAvailable: []
        })

        beach.save()
            .then(newBeach => {
                return res.json({
                    success: true,
                    beach: newBeach
                });
            });

    } catch (error) {
        return next({
            status: 403,
            message: err.message

        });
    };
});




module.exports = BeachRouter;