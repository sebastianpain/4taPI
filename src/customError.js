export default  class customError {
    static createError({ name="Error",cause,message,code=1}){
        const error = new Error (message,{cause})
        error.name =name
        error.code=code
        console.log( "\u001b[1;35m" + error.name + " "+ error.code);
        throw error
    }

}