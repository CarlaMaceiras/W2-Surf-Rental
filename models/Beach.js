const mongoose= require("mongoose");

const BeachSchema= new mongoose.Schema({
    name: {
      type: String,
      required: true 
    }, 
    location:{
      type: String,
      required: true
    },
    file:{
      type: Object,
      required: true
    },
    equipmentAvailable: [{
        sportEquipment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SportEquipment"
        },
        stock: Number
      }]
   
});

module.exports= mongoose.model("Beach", BeachSchema);