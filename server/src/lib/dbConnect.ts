import mongoose from "mongoose"

export const dbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName:'online-compiler'
        });
        console.log("connection is done");
    }catch (error){
        console.log("error connecting to Database");
        
    }
    
}