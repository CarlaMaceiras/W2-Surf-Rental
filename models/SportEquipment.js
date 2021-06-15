const mongoose= require("mongoose");

const SportEquipmentSchema= new mongoose.Schema({
    model: String, 
    size: Number,
    level: String,
  
});

module.exports= mongoose.model("SportEquipment", SportEquipmentSchema);