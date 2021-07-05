const express = require("express");
const SportEquipment = require("../models/SportEquipment");
const SportEquipmentRouter = express.Router();
const cloudinary = require("cloudinary");
const fs = require("fs-extra");



//CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
};



//Crear nuevo material
SportEquipmentRouter.post("/", async (req, res, next) => {


    try {

        const { model, size, level } = req.body;

        const { file } = req.files;



        if (!model || !size || !level) {
            return next({
                status: 403,
                message: "rellena todos los campos"
            })
        }

        if (!file) {
            return next({
                status: 403,
                message: "No hay archivos que mostrar"
            });
        }

        const findEquipment = await SportEquipment.findOne({ model } )       //Si el material existe, nos avisa de que ya existe     

        if (findEquipment) {
            return next({
                status: 403,
                message: "This equipment already exists"
            });
        }

        if (!req.files || Object.keys(req.files).length == 0) {
            return next({
                status: 403,
                message: "No hay archivos subidos"
            });
        }


        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath)
            return next({
                status: 403,
                message: "Archivo demasiado grande"
            });
        };

        if (file.mimetype != "image/jpg" && file.mimetype != "image/png" && file.mimetype != "image/jpeg") {
            removeTmp(file.tempFilePath)
            return next({
                status: 403,
                message: "La imagen tiene un formato no aceptado"
            });
        };

        const newFile = await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "W2" })
        removeTmp(file.tempFilePath);

        const newEquipment = new SportEquipment({
            model: model.toLowerCase(),
            size,
            level,
            file: { public_id: newFile.public_id, url: newFile.secure_url }
        });

        await newEquipment.save()
        return res.json({
            success: true,
            sportEquipment: newEquipment
        });


    } catch (err) {
        return next({
            status: 403,
            message: err.message

        });
    };
});



//coger, ver, todo el material (sin estar asociado a una playa)
SportEquipmentRouter.get("/", async (req, res, next) => {
    try {

        let sports = await SportEquipment.find({})
        return res.json({
            success: true,
            sports
        });

    } catch (err) {
        return next({
            status: 403,
            message: err.message

        });
    };

});

//coger solo un material (sin estar asociado a una playa)
SportEquipmentRouter.get("/oneEquipment/:id", async (req, res, next) => {
    try {

        const { id } = req.params

        let material = await SportEquipment.findById(id).populate("equipmentAvailable.sportEquipment");
        return res.json({
            success: true,
            material
        });

    } catch (err) {
        return next({
            status: 403,
            message: err.message

        });
    };

});

//Eliminar un material

SportEquipmentRouter.delete("/deleteEquipment", async (req, res, next) => {
    try {

        const { id } = req.body
        const sports = await SportEquipment.findById(id);

        const { public_id } = sports.file;

        if (!public_id) {
            return next({
                status: 403,
                message: "No hay una imagen seleccionada"
            });
        };

        await cloudinary.v2.uploader.destroy(public_id)

        await sports.deleteOne()

        res.json({
            success: true,
            message: "Material eliminado"
        })


    } catch (err) {
        return next({
            status: 403,
            message: err.message

        });
    }
})




module.exports = SportEquipmentRouter;