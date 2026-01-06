import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connect");
  } catch (error) {
    console.log("error while connecting with mongodb", error);
  }
};

export default connectDB;
