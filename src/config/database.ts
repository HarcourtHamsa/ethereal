import mongoose from "mongoose";

const databaseUrl = process.env.MONGO_URL as string;

(async () => {
  await mongoose.connect(databaseUrl, { dbName: "ethereal" });
})();

export const db = mongoose.connection;

db.on("connected", () => console.log("Connected to Database"));

db.on("disconnected", () => console.log("Disconnected from Database"));

db.on("close", () => console.log("Database connection closed"));

db.on("error", (error) => console.log("Database connection error:", error));
