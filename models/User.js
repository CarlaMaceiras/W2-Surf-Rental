const mongoose = require("mongoose");
const UserRouter = require("../routes/UserRouter");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        require: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true                          //elimina espacios en blanco
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },

    // role: {
    //     type: Number,
    //     default: 0                      //0= todos usuarios, 1= admin
    // },
});

//Encriptar contraseña para que no se vea en la base de datos
UserSchema.pre("save", function (next) {                                    //.pre= antes de que. Antes de que "save" del schema., vamos a hacer la función next
    if (!this.isNew || !this.isModified("password")) {              //Si el modelo no es nuevo o la password no ha sido modificada, sigue adelante. Es decir, tenemos un usuario y le queremos cambiar el nombre o algo... el usuario no es nuevo. Así que en este caso no hay nada que encriptar, así que next ()
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {                             //Sino, si el usuario es nuevo o le hemos cambiado la contraseña  y hay que encriptarla... entonces primero llamamos a .genSalt que es el algoritmo que encripta
        if (err) return next(err);                                 //nos devuelve un salt que lo utilizamos para encriptar

        bcrypt.hash(this.password, salt, (err, hash) => {           //Le pasamos nuestra pasword, el salt, y con la función nos devuelve el hash (contraseña encriptada)
            if (err) return next(err);                              //this = UserSchema, password= la que haya puesto el usuario

            this.password = hash;

            next();
        });
    });
});

module.exports = mongoose.model("User", UserSchema);