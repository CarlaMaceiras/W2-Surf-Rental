const mongoose= require("mongoose");

const SportEquipmentSchema= new mongoose.Schema({
    model: String, 
    size: Number,
    level: String,
    // beach: {
    //     beach: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "beach"
    //     },
    //     stock: Number
    // },
    
    
});

module.exports= mongoose.model("SportEquipment", SportEquipmentSchema);