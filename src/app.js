import express from 'express';
import __dirname from './utils.js';

import usersRouter from './routes/users.router.js';
import coursesRouter from './routes/courses.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js'

import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cookieParser from 'cookie-parser';
import config from './config/config.js';

import addLogger from './middleware/logger.middleware.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express'

const app = express();
const PORT = 8045;
const PRIVATE_KEY ="CoderKeyQueFuncionaConUnSecret"
const connection = mongoose.connect(config.mongo.URL)

const users = []// de momento se opetara por una persistencia en memoria



    


app.post('register',(req,res)=>{
    const {name,email,password}=req.body;
    const exists = users.find(user=>user.email===email);
    if(exists) return res.status(400).send({status:"error",error:"User already exists"});
    const user ={
        name,
        email,
        password
    }
    user.push(user);
    //generamos un token con el usuario
    const access_token=generateToken(user);
    res.send({status:"success", access_token})

})
app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    const user = user.find(user=>user.email===email);
    if(!user) return res.status(400).send({status: "error",error:"user already exists"});
    const access_token=generateToken(user);
    res.send({status:"succes",access_token});
})

/**
 * Documentacion
 */
 const swaggerOptions={
    definition:{
        openapi:'3.0.1',
        info:{
            tittle: ' Documentacion de las APis 4ta practica',
            description: ' Informacion de las APis creadas para el proyecto de la paractica integradora',
            version:'1.0.0',
            contact: {
                name: 'Andrea Lopez',
                email: 'correo.correo@.co'
            }

        }
    },
    apis: [`./src/docs/*.yaml`]
 }

 const specs = swaggerJSDoc(swaggerOptions)
/**
 * Template engine
 */
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

/**
 * Middlewares
 */
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

initializePassport();
app.use(passport.initialize());
app.use(cookieParser());

app.use(addLogger)
app.use('/',viewsRouter)
app.use('/api/users',usersRouter);
app.use('/api/courses',coursesRouter);
app.use('/api/sessions',sessionsRouter);

app.use('/api-docs',swaggerUIExpress.serve, swaggerUIExpress.setup(specs))


const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));