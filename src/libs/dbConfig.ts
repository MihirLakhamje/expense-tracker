import mongoose from "mongoose";

export default async function dbConfig() {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI!}/spending`);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB database connection established successfully");
        })

        connection.on("error", (err) => {
            console.log("MongoDB database connection failed");
            console.log(err.message);
            process.exit();
        })
    }catch(e: any) {
        console.log("Connection failed");
        console.log(e.message)
    }
}