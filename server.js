const express= require("express")
const mongoose =require("mongoose");
const cors= require("cors");
const fileUpload = require("express-fileupload"); 
require("dotenv").config();                
const { errorHandler, checkToken, authAdmin } = require("./middleware"); 
const app= express();
const {DB_URI, PORT} = process.env          //Es lo mismo que poner: const DB_URI= process.env.DB_URI;
const path = require("path");


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


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({useTempFiles:true}));


app.use("/api/users", UserRouter);
app.use("/api/sports", checkToken, SportEquipmentRouter);       //Esto es un middleware
app.use("/api/beaches", BeachRouter);
app.use("/api/rent",  checkToken, RentalRouter);

//app.use("/sports",checkToken, authAdmin, SportEquipmentRouter);


app.use(errorHandler);  //se pone aquí abajo porque los middelwares "expess.json y express.urlencoded" suceden antes de llegar a la ruta. Después entra en los get, put, ets y los error van después, suceden después


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT || 5000, () => console.log(`now listening for requests on port ${PORT}`));




