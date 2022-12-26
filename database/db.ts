import mongoose from "mongoose";

const mongooConection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongooConection.isConnected) {
    console.log("DB Online");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongooConection.isConnected = mongoose.connections[0].readyState;

    if (mongooConection.isConnected === 1) {
      console.log("Using previuos connection");
      return;
    }
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || "");
  mongooConection.isConnected = 1;

  console.log("Mongo Connect correctly", process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (mongooConection.isConnected === 0) return;
  await mongoose.disconnect();
  console.log("Mongoose disconnect correctly");
};
