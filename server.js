const express= require("express")
const app= express();
const mongoose =require("mongoose");
const { errorHandler, checkToken, authAdmin } = require("./middleware");


require("dotenv").config();
const {DB_URI, PORT} = process.env     //Es lo mismo que poner: const DB_URI= process.env.DB_URI;

//Importar router

const SportEquipmentRouter = require ("./routes/SportEquipmentRouter");
const BeachRouter = require ("./routes/BeachRouter");
const UserRouter = require("./routes/UserRouter");
const RentalRouter = require ("./routes/RentalRouter");
const AdminRouter = require("./routes/AdminRouter");



mongoose.connect(DB_URI , { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
.then (()=>{
    console.log("DB connected");                                //ó   const connectDB= ()=> {
                                                                //     await mongoose.connect(URI);
                                                                //     console.log("db connected..");    
                                                                //     }
});                                                              



app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/users", UserRouter);
app.use("/sports", SportEquipmentRouter);       //Esto es un middleware
app.use("/beaches", BeachRouter);
app.use("/rent",  checkToken, RentalRouter);
app.use("/admin", AdminRouter);

app.use(errorHandler);  //se pone aquí abajo porque los middelwares "expess.json y express.urlencoded" suceden antes de llegar a la ruta. Después entra en los get, put, ets y los error van después, suceden después


app.listen(PORT || 5000, () => console.log(`now listening for requests on port ${PORT}`));




