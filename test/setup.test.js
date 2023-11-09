import mongoose from "mongoose";
import userModel from "../src/dao/models/users.js";

before(async()=>{
    try{
        await mongoose.connect('mongodb+srv://Aruzuhed:Coder123@testing.4q254eb.mongodb.net/?retryWrites=true&w=majority')
    }catch(error)
    {
        console.log("Fallo la conexion")
    }
})

after(async()=>{
    mongoose.connection.close()
})

export const dropUser =async()=>{
    await userModel.collection.drop()
} 