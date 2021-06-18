const mongoose= require("mongoose");

const SportEquipmentSchema= new mongoose.Schema({
    model: {
        type: String,
        required: true 
    },
    size: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    file: {
        type: Object,
        required: true
    }

  
});

module.exports= mongoose.model("SportEquipment", SportEquipmentSchema);