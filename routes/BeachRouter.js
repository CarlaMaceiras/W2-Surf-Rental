const express = require("express");
const { checkToken, errorHandler } = require("../middleware");
const Beach = require("../models/Beach");
const SportEquipment = require("../models/SportEquipment");
const BeachRouter = express.Router();

// GET todas las playas                                 
BeachRouter.get("/", async (req, res) => {

    let beaches = await Beach.find({});         //Buscamos con .find() todo lo que hay dentro del objeto{} de Beach. (nombre, localización y equipmentAvailable[vacía])

    return res.json({                                       //Le decimos que nos devuelva en un json lo que se encontró en el objeto, que está guardado en la variable "beaches"
        success: true,
        beaches
    });
});

//mostrar info de una playa
BeachRouter.get("/find/:id", async (req, res) => {          //nueva ruta /find donde le pasamos por parámetro la "id"  de la playa
    const { id } = req.params                               //variable id va a ser igual que el id que le pasamos por parámetro

    //const id = req.params.id 

    let beach = await Beach.findById(id).populate("equipmentAvailable.sportEquipment");  // dentro de variable "beach" se guardará lo que se encuentre dentro del objeto de Beach que sea igual a id.
                                                                                         //A parte, dentro del array del material, no se verá solo por id cada material sino el nombre

    return res.json({
        success: true,
        beach
    });
});

//Añadir equipamiento a una playa                          //Para actualizar la playa y añadir el material. Porque el material es un objeto que está en el modelo SportEquipment, y su stock en esta playa
BeachRouter.put("/addEquipment", async (req, res) => {
    const { beachId, equipmentId, stock } = req.body;       //En el body de Postman tendremos estas 3 keys

    let playa = await Beach.findById(beachId)               //encontramos por id dentro del objeto Beach lo que corresponde al id de la playa. El id de la playa que queremos encontrar se lo pasamos en el body con key beachId 

    let object = {                                          //Creamos una variable que sea un objeto y contenga el sportEquipment y el stock.( tal y como está en el modelo Beach)
        sportEquipment: equipmentId,                        //El sportEquipment se corresponderá con el id que le pasamos del material que queremos. Ese id se pondra en el body con key equipmentId
        stock                                               
    }

    playa.equipmentAvailable.push(object);                  //en la playa(Beach), dentro de equipmentAvailable que hasta ahora estaba vacío, le añadimos ese objeto.

    let playaActualizada = await playa.save();              //Se crea una variable que contenga la playa con los cambios y se guarde
    return res.json({                                       //se pide que devuelva que beach (que es una playa en concreto) se actualice con los datos de la playa actualizada
        success: true,
        beach: playaActualizada
    });

})

//Añadir stock de equipamiento a una playa
BeachRouter.put("/addEquipment/stock", async (req, res, next) => {            //Se pone "next" para decirle que vaya al siguiente middleware que encuentre. En este caso es un errorHandler
    const { beachId, equipmentId, stock } = req.body;

    let playa = await Beach.findById(beachId);
    let material= playa.equipmentAvailable.find(equipment => {
       return equipment.sportEquipment== equipmentId
    })

    if (!material) {                                                            //si hay error, le pasamos el next para que vaya al errorHandler. lo que hay dentro del return es el argumento que recibirá como parámetro "err" del errorHandler 
        return next({
            status: 403,                                                     //no hace falta pasarle success porque ya lo tiene el middleware, pero sí que hay que pasarle el status
            message: "Este material no existe en esta playa"
        })
    }

    material.stock += parseFloat(stock);


    let nuevaPlaya= await playa.save()
    return res.json({
        success: true,
        playa: nuevaPlaya
    });

})

//Eliminar stock de equipamiento a una playa
BeachRouter.put("/removeEquipment/stock", async (req, res, next) => {            
    const { beachId, equipmentId, stock } = req.body;

    let playa = await Beach.findById(beachId);
    let material= playa.equipmentAvailable.find(equipment => {
       return equipment.sportEquipment== equipmentId
    })

    if (!material) {                                                           
        return next({
            status: 403,                                                     
            message: "Este material no existe en esta playa"
        })
    }

    material.stock -= parseFloat(stock);


    let nuevaPlaya= await playa.save()
    return res.json({
        success: true,
        playa: nuevaPlaya
    });

})

//Eliminar playa

BeachRouter.delete ("/deleteBeach/:id", async (req, res) => {
    const { id } = req.params
    const {beachId} = req.body;

    let playa = await Beach.findById(id);

    let borrarPlaya= await playa.deleteOne({"_id" : beachId});

    borrarPlaya.save()

   
    return res.json ({
        success: true,
        message: "Playa eliminada correctamente"
    });   

})

//Eliminar material concreto de una playa

BeachRouter.put("/removeEquipment/:id", async (req, res, next) => {
    const { id } = req.params;                                              //id de la playa
    const { sportEquipment_id } = req.body;                                 //_id del objeto

    if (!sportEquipment_id) {
        return next({
            status: 403,
            message: "introduce el _id"
        })
    }

    let beach = await Beach.findById(id)

    const index = beach.equipmentAvailable.findIndex(equipment => {         //Quiero eliminar un material concreto con el _id, no con el sportequipmentid porque sino se me borra el primero
        
        if (equipment._id == sportEquipment_id) {                            //ERROR
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


})

//Crear una playa

BeachRouter.post("/", (req, res, next) => {
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
});




module.exports = BeachRouter;