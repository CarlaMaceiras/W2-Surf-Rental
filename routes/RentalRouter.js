const express = require("express");
const { errorHandler } = require("../middleware");
const Rental = require("../models/Rental");
const RentalRouter = express.Router();
const User = require("../models/User");
const Beach = require("../models/Beach");
const jwt = require("jsonwebtoken");



//Crear reserva cuando usuario esté login

RentalRouter.post("/newRental/:beachId", async (req, res, next) => {
    const user = req.user.id;
    const { beachId } = req.params;
    const { equipmentId, quantity, date } = req.body;

    if (!equipmentId || !quantity || !date){
        return next({
            status: 403,
            message: "Por favor, introduce todos los datos"
        })
    }

    let playa = await Beach.findById(beachId);


    if (!playa) {
        return next({
            status: 403,
            message: "Esta playa no existe"
        })
    };

    let material = playa.equipmentAvailable.find(equipment => {
        return equipment.sportEquipment == equipmentId
    }).populate("sportEquipment");

    if (!material) {
        return next({
            status: 403,
            message: "Este material no existe en esta playa"
        })
    };

    let stockInicial = material.stock;


    if (stockInicial < 1) {
        return next({
            status: 403,
            message: "Este material se ha agotado. Por favor, escoge otro"
        })
    };


    if (quantity > stockInicial) {
        return next({
            status: 403,
            message: "No hay suficiente material. Por favor escoge otro"
        })
    };

    material.stock -= quantity;


    const crearReserva = new Rental({
        user,
        beach: beachId,
        sportEquipment: equipmentId,
        quantity,
        date: new Date(date),
        status: 1
    });

    let nuevaReserva = await crearReserva.save();

    await playa.save()
    return res.json({
        success: true,
        nuevaReserva
    });

});

//ver todas las reservas

RentalRouter.get("/myRental", async (req, res, next) => {
    const user = req.user.id;
    
    let myRental= await Rental.find({user});

    return res.json({
        success: true,
        myRental
    });

});


//ver solo una reserva


RentalRouter.get("/myRental/:nuevaReservaId", async (req, res, next) => {
    const user = req.user.id;
    const {nuevaReservaId} = req.params;

    let oneRental= await Rental.findById(nuevaReservaId);

    if (!oneRental) {
        return next({
            status: 403,                                                     
            message: "Esta reserva no existe"
        })
    }

    return res.json({
        success: true,
        oneRental
    });

});

//Eliminar reserva

RentalRouter.delete("deleteMyRental/:id", async (req, res, next) => {
    const user = req.user.id;
    const {id} = req.params;

    let myRental= await Rental.findById(id);

    if (!myRental){
        return next({
            status: 403,
            message: "Por favor, introduce todos los datos"
        })
    }

    if (myRental.user != user) {
        return next({
            status: 401,
            message: "No es tu reserva"
        });
    };

    let playa = Beach.findById(Rental.beach);

    let material = playa.equipmentAvailable.find(equipment => {
        return Rental.sportEquipment == equipment.sportEquipment
    });

    material.stock += myRental.quantity;

   await myRental.deleteOne();
    
    await playa.save()


    return res.json ({
        success: true,
        message: "Reserva eliminada correctamente"
    })
})

//Comparar reservas por día para devolver el stock cuando pase la fecha de la reserva 
RentalRouter.put("/allRental", async (req, res, next) => {
    const user = req.user.id;
    
    let allRental= await Rental.find({status: 1});

    if (!allRental){
        return next({
            status: 403,
            message: "No hay reservas que mostrar"
        })
    };

    // let reservaPasada= allRental.find(resetRentall => {
    //     if (resetRentall.date < new Date) {
    //         let sumQuantity= resetRentall.quantity;
    //     }
    // })
});

module.exports = RentalRouter;