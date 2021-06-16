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
            user: newUser
        })

    } catch (error) {
        return next({
            status: 500,
            message: error.message
        });
    }
});


//Singup Admin

UserRouter.post("/singup/newAdmin", async (req, res, next) => {  //  

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




module.exports = UserRouter;


