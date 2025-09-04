import mongoose from 'mongoose';

const DB_NAME = "";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMONGODB connected :: DB_HOST :: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED ::", error);
        process.exit(1);
    }
}

export default connectDB;