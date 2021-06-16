const mongoose = require("mongoose");
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
        trim: true                          
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },

    role: {
        type: Number,
        default: 0                      //0= todos usuarios, 1= admin
    },
    
});

//Encriptar contraseña para que no se vea en la base de datos
UserSchema.pre("save", function (next) {                                    
    if (!this.isNew || !this.isModified("password")) {              
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {                             
        if (err) return next(err);                                 

        bcrypt.hash(this.password, salt, (err, hash) => {           
            if (err) return next(err);                              

            this.password = hash;

            next();
        });
    });
});

module.exports = mongoose.model("User", UserSchema);