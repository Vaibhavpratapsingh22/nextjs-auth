import mongoose  from "mongoose";

export async function connect (){
    try{
        mongoose.connect(process.env.mongo_url!);
        const connection = mongoose.connection;
        connection.on('connected', () =>{
            console.log('Mongoose connection established')
        })
    }
    catch(err:any){
        throw new Error(err.message);

    }
}