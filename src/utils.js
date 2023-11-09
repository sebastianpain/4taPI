import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';

const PRIVATE_KEY = "CoderKeyQueFuncionaComoUnSecret"
const generateToken = (user) => {
    const token = jwt.sign({user},PRIVATE_KEY,{expiresIn:"24hs"})
    return token

}
const authToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)return res.status(401).send({
        error:"Not authenticated"
    })
    const token = authHeader.split('')[1];
    jwt.verify(token,PRIVATE_KEY,(error,credenntials)=>{
        if(error) return res.status(403).send({error:"not authorized"})
        req.user = credenntials.user;
    next();
    })
}
export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}
export const isValidPassword = (user,password) => bcrypt.compare(password,user.password);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,__dirname+'/public/img')
},
filename:function(req,file,cb){
    cb(null,file.originalname)
}
}); 
export const uploader= multer({storage});

export default __dirname;