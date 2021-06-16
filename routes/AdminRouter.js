const express = require("express");
const Admin = require("../models/Admin");
const AdminRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { check, oneOf } = require('express-validator');
const validator = require('validator');


//Singup
AdminRouter.post("/singup", async (req, res, next) => {    

    try {                                              

        const { name, surname, email, password } = req.body;

        const findAdmin = await Admin.findOne({ email })       

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

        let admin = new Admin({
            name,
            surname,
            email,
            password,
            role: 1
        });

        let newAdmin = await admin.save()

        const token = jwt.sign({ id: newAdmin._id }, JWT_SECRET, { expiresIn: "24h" });           

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

AdminRouter.post("/login", async (req, res, next) => {
    try {

        const { email, password } = req.body;                 

        const admin = await Admin.findOne({ email })            

        if (!admin) {
            return next({
                status: 403,
                message: "Wrong credentials"                            
            });
        }                                                             

        const match = await bcrypt.compare(password, admin.password)   

        if (!match) {                                               
            return next({
                status: 403,
                message: "wrong credentials"
            })
        }

        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "24h" });   
        

        return res.json({                                                                
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




module.exports = AdminRouter;


