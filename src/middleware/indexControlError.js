import EError from "../enum.js";

export default (error,req,res,next)=>{
    console.log( "\u001b[1;34m  Ingreso al middleware" );
    switch(error.code){
        case EError.INVALID_TYPES_ERROR:
            res.send({ status:"Error",error: error.name})
            break
        default:
            res.send({ status:"Error",error: "Erro Desconocido"})
    }
}