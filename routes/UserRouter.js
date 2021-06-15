const express = require("express");
const User = require("../models/User");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { check, oneOf } = require('express-validator');
const validator = require('validator');


//Singup
UserRouter.post("/singup", async (req, res, next) => {  //  

    try {                                               //Es para coger errores.... En este caso, si por ejemplo ponemos una contraseña de menos de 6 caracteres, dará error porque es obligatorio en el schema

        const { name, surname, email, password } = req.body;

        const findUser = await User.findOne({ email })       //Si el usuario existe, nos avisa de que ya existe     

        if (findUser) {
            return next({
                status: 403,
                message: "This user already exists"
            });
        }

        if (name.trim() == '' || !/^[a-z]+$/i.test(name)) {
            return next({
                status: 403,
                message: "Please, insert your name"
            });
        }

        if (surname.trim() == '' || !/^[a-z]+$/i.test(name)) {
            return next({
                status: 403,
                message: "Please, insert your surname"
            });
        }

        if (email.trim() == '') {
            return next({
                status: 403,
                message: "Please, insert your email"
            });
        }

        oneOf([
            check("email").isEmail(),
            check('email').not().isEmpty().isString().custom((value, { req }) => {
                if (!validator.isEmail(value)) {
                    req.body.flag = true
                    // you can handler your req.body here .... 

                }
                return true
            })
        ]);


        if (password.trim() == '') {
            return next({
                status: 403,
                message: "Please, insert a password"
            });
        }

        if (password.length < 6) {                    //Aunque en el esquema ya aparece que la password tiene que ser mínimo de 6, está bien que validemos de nuevo esto
            return next({
                status: 403,
                message: "Password too short"
            });
        };

        let user = new User({
            name,
            surname,
            email,
            password
        });

        let newUser = await user.save()

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "24h" });            //así en cuanto se inscriba, ya se loguea

        return res.json({                                                                   //¿ESTO ESTÁ BIEN?
            success: true,
            user: newUser
        })

    } catch (error) {
        return next({
            status: 500,
            message: error.message
        });
    }
});

//login

UserRouter.post("/login", async (req, res, next) => {
    try {

        const { email, password } = req.body;                 //RECORDAMOS: deconstrucción= si no serían 2 líneas: const email = req.body.email; const password = req.body.password

        const user = await User.findOne({ email })            //({email:email})  ||  comprobamos si el usuario existe= buscas dentro de User el usuario que tenga el email que le pasamos por body.

        if (!user) {
            return next({
                status: 403,
                message: "Wrong credentials"                          //Es mejor no dar el mensaje de email not found o password not ok, porque así das información de que ese email existe o no... por seguridad ponemos un mensaje más general   
            });
        }                                                             //Ahora verificamos la contraseña

        const match = await bcrypt.compare(password, user.password)   //Desencripta la contraseña y la compara con la que le pasamos. Nos devuelve true o false

        if (!match) {                                               //Si no coinciden, se manda error
            return next({
                status: 403,
                message: "wrong credentials"
            })
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });   //1er parámetro, guardamos dentro (en un objeto mejor) la info que queramos. 2º string que va a ser nuestra llave para desencriptar los token que tenemos
        //Guardamos en el .env el 2ºparam. porque ese archivo es secreto y no se sube a ningun lado
        //3ºOptions: cogemos solo expiresIn para decir cuánto tiempo durará el token
        //En resumen, dentro del token en este caso guardamos un objeto con info que queremos encriptar, como la id en este caso.

        return res.json({                                                                //Si todo está correcto, cuando se pide para loguearse se envía el token (en vez de un success: true)
            success: true,
            token
        });

    } catch (error) {
        return next({
            status: 403,
            message: err.message

        });
    };


});

// UserRouter.get("/logout", async (req, res) => {
//     req
// })




module.exports = UserRouter;





//Cómo funciona el token: es una "caja" que guarda info en el frontend que el backend ha llenado, ha cerrado con llave y se la ha mandado. O pase vip: al frontend le mandan un pase con un código QR. Cuando quieres utilizarla, vas a junto el portero (backend), lo lee y te dice si puedes pasar o no

//Un user pide loguearse y recibe el token