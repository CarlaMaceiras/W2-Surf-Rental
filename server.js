const express= require("express")
const mongoose =require("mongoose");
require("dotenv").config();                
const { errorHandler, checkToken, authAdmin } = require("./middleware"); 
const app= express();
const {DB_URI, PORT} = process.env          //Es lo mismo que poner: const DB_URI= process.env.DB_URI;
const fileUpload = require("express-fileupload"); 

//Importar router

const SportEquipmentRouter = require ("./routes/SportEquipmentRouter");
const BeachRouter = require ("./routes/BeachRouter");
const UserRouter = require("./routes/UserRouter");
const RentalRouter = require ("./routes/RentalRouter");




mongoose.connect(DB_URI , { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
.then (()=>{
    console.log("DB connected");                                //ó   const connectDB= ()=> {
                                                                //     await mongoose.connect(URI);
                                                                //     console.log("db connected..");    
                                                                //     }
});                                                              



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({useTempFiles:true}));


app.use("/users", UserRouter);
app.use("/sports",checkToken, authAdmin, SportEquipmentRouter);       //Esto es un middleware
app.use("/beaches", BeachRouter);
app.use("/rent",  checkToken, RentalRouter);


app.use(errorHandler);  //se pone aquí abajo porque los middelwares "expess.json y express.urlencoded" suceden antes de llegar a la ruta. Después entra en los get, put, ets y los error van después, suceden después


app.listen(PORT || 5000, () => console.log(`now listening for requests on port ${PORT}`));




