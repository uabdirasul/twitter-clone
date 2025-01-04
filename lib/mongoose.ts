import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URI) {
    return console.error("MongoDB URI is not set");
  }

  if (isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const options: ConnectOptions = {
      dbName: "x-clone",
      autoCreate: true
    };

    await mongoose.connect(process.env.MONGO_URI, options);

    isConnected = true;
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
};
