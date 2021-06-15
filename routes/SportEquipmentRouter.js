const express = require("express");
const SportEquipment = require("../models/SportEquipment");
const Beach = require("../models/Beach");
const SportEquipmentRouter = express.Router();

//coger, ver, todo el material (sin estar asociado a una playa)
SportEquipmentRouter.get("/", async (req, res) => {
    try {

        let sports = await SportEquipment.find({})
        return res.json({
            success: true,
            sports
        });

    } catch (error) {
        return next({
            status: 403,
            message: err.message

        });
    };

});

//Crear nuevo material
SportEquipmentRouter.post("/", (req, res, next) => {
    try {


        const { model, size, level } = req.body;

        if (!model || !size || !level) {
            return next({
                status: 403,
                message: "rellena todos los campos"
            })
        }

        let sportEquipment = new SportEquipment({
            model,
            size,
            level
        })

        sportEquipment.save()
            .then(newSportEquipment => {
                return res.json({
                    success: true,
                    sportEquipment: newSportEquipment
                });
            });

    } catch (error) {
        return next({
            status: 403,
            message: err.message

        });
    };
});




module.exports = SportEquipmentRouter;