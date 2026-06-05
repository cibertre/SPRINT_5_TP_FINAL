import mongoose from "mongoose";

import dns from "node:dns/promises";

dns.setServers([
  "1.1.1.1",
  "8.8.8.8"
]);

const connectDB = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB conectado"
    );

  } catch (error) {

    console.log(
      "Error MongoDB:"
    );

    console.log(error);

  }
};

export default connectDB;