import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log("Database is conneted ");
  } catch (error) {
    console.log('DB connection error: ', error.message);
    process.exit(1) // to 
  }
}
export default connectDB;