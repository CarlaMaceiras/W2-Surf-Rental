const mongoose= require("mongoose");

const BeachSchema= new mongoose.Schema({
    name: String, 
    location: String,
    equipmentAvailable: [{
        sportEquipment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SportEquipment"
        },
        stock: Number
      }]
    // Activities: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: ""
    // }
});

module.exports= mongoose.model("Beach", BeachSchema);