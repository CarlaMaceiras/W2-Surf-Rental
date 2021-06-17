const express = require("express");
const { errorHandler, authAdmin } = require("../middleware");
const Rental = require("../models/Rental");
const RentalRouter = express.Router();
const User = require("../models/User");
const Beach = require("../models/Beach");
const jwt = require("jsonwebtoken");



//Crear reserva cuando usuario esté login

RentalRouter.post("/newRental/:beachId", async (req, res, next) => {
    try {
        const user = req.user.id;
        const { beachId } = req.params;
        const { equipmentId, quantity, date } = req.body;

        if (!equipmentId || !quantity || !date) {
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
        });

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

        let fecha = new Date(date);
        fecha.setHours(fecha.getHours() + 2);

        const crearReserva = new Rental({
            user,
            beach: beachId,
            sportEquipment: equipmentId,
            quantity,
            date: fecha,
            status: "reservado"
        });

        let nuevaReserva = await crearReserva.save();

        await playa.save()
        return res.json({
            success: true,
            nuevaReserva
        });

    }
    catch (err) {
        return next({
            status: 500,
            message: err.message

        })
    };
});

//ver todas las reservas

RentalRouter.get("/myRental", async (req, res, next) => {

    try {

        const user = req.user.id;

        let myRental = await Rental.find({ user })
            .populate("beach", "name")
            .populate("sportEquipment")
            .populate("user", "name")

        return res.json({
            success: true,
            myRental
        });
    }

    catch (err) {
        return next({
            status: 400,
            message: err.message
        });
    };

});

//ver todas las reservas de todos los usuarios

RentalRouter.get("/allRental/listOfRental", authAdmin, async (req, res, next) => {

    try {

        const user = req.user.id;

        let listOfRental = await Rental.find()
            .populate("beach", "name")
            .populate("sportEquipment")
            .populate("user", "name")


        return res.json({
            success: true,
            listOfRental
        });
    }

    catch (err) {
        return next({
            status: 400,
            message: err.message
        });
    };

});


//ver solo una reserva


RentalRouter.get("/myRental/:nuevaReservaId", async (req, res, next) => {

    try {


        const user = req.user.id;
        const { nuevaReservaId } = req.params;

        let oneRental = await Rental.findById(nuevaReservaId).populate("beach", "name").populate("sportEquipment").populate("user", "name");

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

    } catch (err) {
        return next({
            status: 403,
            message: err.message

        })
    }

});

//Eliminar reserva

RentalRouter.delete("/deleteMyRental/:id", async (req, res, next) => {
    try {


        const user = req.user.id;
        const { id } = req.params;

        let myRental = await Rental.findById(id);
        
        if (!myRental) {
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

        let playa = await Beach.findById(myRental.beach);

        let material = playa.equipmentAvailable.find(equipment => {
            return myRental.sportEquipment.equals(equipment.sportEquipment)
        });

        material.stock += myRental.quantity;

        await myRental.deleteOne();

        await playa.save()


        return res.json({
            success: true,
            message: "Reserva eliminada correctamente"
        })

    } catch (err) {
        return next({
            status: 403,
            message: err.message

        })
    }

})

//Comparar reservas por día para devolver el stock cuando pase la fecha de la reserva 
RentalRouter.put("/allRental", authAdmin, async (req, res, next) => {

    try {

        const user = req.user.id;

        let allRental = await Rental.find({ status: "reservado" });

        if (allRental.length == 0) {
            return next({
                status: 403,
                message: "No hay reservas que mostrar"
            })
        };

        let fecha = new Date();
        fecha.setHours(fecha.getHours() + 2);
        fecha.setHours(0, 0, 0, 0);

        for (let resetRental of allRental) {           //de allRental cogemos resetRental

            if (resetRental.date < fecha) {
                let buscarPlaya = await Beach.findById(resetRental.beach);

                let material = buscarPlaya.equipmentAvailable.find(equipment => {

                    return equipment.sportEquipment.equals(resetRental.sportEquipment)

                });


                material.stock += resetRental.quantity
                resetRental.status = "libre";

                await resetRental.save();

                await buscarPlaya.save();

            }
        };

        return res.json({
            success: true,
            message: "Reservas actualizadas"
        })

    } catch (err) {
        return next({
            status: 403,
            message: err.message

        })
    }

});

module.exports = RentalRouter;