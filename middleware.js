const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin");


let checkToken = (req, res, next) => {
    let token = req.headers ["x-access-token"] || req.headers["authorization"];   //El token lo mandamos por los headers (como el fech). Por ejemplo, se copia el token que aparezca en postman y se va a la pestaña de Authorization xej. Bearer token-> pegar el token
    if (token && token.startsWith("Bearer ")) {                                    //si token existe y si empieza por "Bearer"
        //Eliminar bearer del string
        token = token.slice(7, token.length);                                       //Se elinima el Bearer con su espacio y solo queda el propio token
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Auth token is not supplied"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {               //Verificar el token: pasamos el token, la key abierta y decoded será el objeto que se le pasa como primer parametro al token (id en este caso)
        if (err) {
            return res.status(401).json({                                       //Si intentamos entrar otro día con ese token, o entrar con otra sintaxis, da error

                success: false,
                message: "Token is not valid"
            });
        }
        req.user = decoded;                                                     //Si está ok, decimos que req.user es decoded, es decir, el objeto del token, el id del usuario en este caso
        next();
        
    });
};

//PARA UTILIZAR EL CHECKTOKEN SOLO NECESITO PONER CHECKTOKEN ANTES DE ASYNC (comprobar que se importe const { checkToken } = require("../middleware");)
//Si queremos que toda una página sea privada, lo ponemos en serves.js=> dentro app.use("/beaches", checkToken, BeachRouter);



const errorHandler = (err, req, res, next) => {   //En err recibe el objeto que está en el "return next()"
    console.error(err);
    res.status(err.status || 400).send({
        success: false,
        message: err._message || err.message
    });

};

const authAdmin = async (req, res, next) =>{
    try {
        // Cogemos la informacion del usuario por id, para verificar si su role es 0(user) o 1(admin)
        const admin = await User.findOne({
            _id: req.user.id
        })
        if(admin.role === 0)
            return res.status(400).json({msg: "Acceso denegado! No eres admin"})

        next()
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports= {
    errorHandler,
    checkToken,
    authAdmin
};