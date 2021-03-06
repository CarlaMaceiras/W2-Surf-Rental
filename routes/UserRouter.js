const express = require("express");
const User = require("../models/User");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, VERIFICATION, JWT_SECRET_RESET } = process.env;
const { check, oneOf } = require('express-validator');
const validator = require('validator');
const { checkToken } = require("../middleware");




//Signup
UserRouter.post("/signup", async (req, res, next) => {  //  

    try {

        const { name, surname, email, password } = req.body;

        const findUser = await User.findOne({ email })

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

        if (password.length < 6) {
            return next({
                status: 403,
                message: "Password too short"
            });
        };

        let user = new User({
            name,
            surname,
            email,
            password,
            role: 0
        });

        let newUser = await user.save()



        return res.json({
            success: true,
            user: newUser,
            message: "Usuario creado correctamente"
        })

    } catch (error) {
        return next({
            status: 500,
            message: error.message
        });
    }
});


//Signup Admin

UserRouter.post("/signup/newAdmin", async (req, res, next) => {  //  

    try {

        const { name, surname, email, password } = req.body;

        const findAdmin = await User.findOne({ email })

        if (findAdmin) {
            return next({
                status: 403,
                message: "This admin already exists"
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

        if (password.length < 6) {
            return next({
                status: 403,
                message: "Password too short"
            });
        };

        let admin = new User({
            name,
            surname,
            email,
            password,
            role: 1
        });

        let newAdmin = await admin.save()

        return res.json({
            success: true,
            admin: newAdmin
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

        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return next({
                status: 403,
                message: "Wrong credentials (user)"
            });
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return next({
                status: 403,
                message: "wrong credentials (password)"
            })
        }



        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });


        return res.json({
            success: true,
            token
        });

    } catch (err) {
        return next({
            status: 403,
            message: err.message

        });
    };


});

//Info de un user login

UserRouter.get('/login/oneUser', checkToken, async (req, res, next) => {
    try {
        const {id} = req.user;
        let oneUser = await User.findById(id).populate("user", "name")

        return res.json({
            success: true,
            oneUser
        })
    } catch (err) {
        return next ({
            status: 401,
            message: err.message
        });
    }
});

//Modificar contrase??a

UserRouter.put("/changePassword", async (req, res, next) => {
    try {

        const { password } = req.body
        const user = await User.findById(req.user.id)

        const samePassword = await bcrypt.compare(password, user.password);

        if (samePassword) {
            return res.status(400).json({
                message: "Por favor, introduce una nueva contrase??a diferente a la actual."
            });
        }


        if (!password)
            return res.status(400).json({
                message: "Introduce tu contrase??a, por favor"
            })

        if (password.length < 6)
            return res.status(400).json({
                message: "La contrase??a debe tener minimo 6 caracteres"
            })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        await user.save()
        res.json({
            message: "Contrase??a actualizada correctamente"
        })

    } catch (err) {
        return next({
            status: 403,
            message: err.message

        });
    };
});

//Contrase??a olvidada, mandar email para reestablecer una contrase??a

UserRouter.put("/forgot-Password", async (req, res, next) => {
    try {

        const { email } = req.body;

        if (!email) {
            return next({
                status: 403,
                message: "email is required"
            });
        }


        const user = await User.findOne({ email })

        if (!user) {
            return next({
                status: 403,
                message: "Wrong credentials (user)"
            });
        }

        let emailStatus = "OK";

        const token = jwt.sign({ id: user._id }, JWT_SECRET_RESET, { expiresIn: "15m" });

        let verificationLink = `http://localhost:5000/new-password/${token}`


        //Env??o de email al usuario

        await user.save()
        res.json({
            success: true,
            message: "Check your email for a link to reset your password.",
            info: emailStatus,
            test: verificationLink

        })


    } catch (err) {
        return next({
            status: 403,
            message: err.message

        });
    }

})

// Crear nueva contrase??a
UserRouter.put("/new-password", async (req, res, next) => {
    try {

        const { newPassword } = req.body;
        let resetToken = req.headers["x-access-token"] || req.headers["authorization"];

        if (resetToken && resetToken.startsWith("Bearer ")) {
            resetToken = resetToken.slice(7, resetToken.length);
        }

        if (!resetToken && !newPassword) {
            return next({
                status: 400,
                message: "All the fields are required"

            });
        };

        console.log("token: ", resetToken);


        jwt.verify(resetToken, process.env.JWT_SECRET_RESET, (err, decoded) => {               //Verificar el token: pasamos el token, la key abierta y decoded ser?? el objeto que se le pasa como primer parametro al token (id en este caso)
            if (err) {
                return res.status(401).json({                                       //Si intentamos entrar otro d??a con ese token, o entrar con otra sintaxis, da error

                    success: false,
                    message: "Token is not valid"
                });
            };
            req.user = decoded;
        });

       

        const user = await User.findById(req.user.id)

        if (!newPassword)
            return res.status(400).json({
                message: "Introduce tu contrase??a, por favor"
            })

        if (newPassword.length < 6)
            return res.status(400).json({
                message: "La contrase??a debe tener minimo 6 caracteres"
            })


        const samePassword = await bcrypt.compare(newPassword, user.password);

        if (samePassword) {
            return res.status(400).json({
                message: "Por favor, introduce una nueva contrase??a diferente a la actual."
            });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save()
        res.json({
            success: true,
            message: "Contrase??a actualizada correctamente"
        });


    } catch (err) {
        return next({
            status: 403,
            message: err.message

        });
    };
});




module.exports = UserRouter;


