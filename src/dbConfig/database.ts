import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const dbconnection = await mongoose.connect(process.env.MONGODB_URL!, {
            dbName: 'linkink'
        });
        console.log('MongoDB Connected');
    }catch(err) {
        console.log(err)
    }
}