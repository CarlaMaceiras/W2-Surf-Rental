const mongoose = require("mongoose");
const User = require("./User");

const RentalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    beach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beach",
    },

    sportEquipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SportEquipment",
    },

    quantity: Number,
    
    date: Date,

    status: {
        type: String,
        default: "reservado",
        enum: ["reservado", "libre"]
    }

});

module.exports = mongoose.model("Rental", RentalSchema);

