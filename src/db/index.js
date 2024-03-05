import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB(){
	try {
		const connectionInst = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
		console.log(`\n Mongoose connected successfully!! ${connectionInst.connection.host}`)
	} catch (error) {
		console.log("MongDB connection FAILED",error)
		process.exit(1)
	}
}

export default connectDB