import { set, connect } from "mongoose";

export const dbConnection = async () => {
  const connUrl = process.env.MONGODB_CONN;
  set("strictQuery", false);
  set("returnOriginal", false);
  try {
    // await mongoose.connect(connUrl);

    await connect(connUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection opened");
  } catch (error) {
    console.log(error);
    throw new Error("ERROR: database connection error");
  }
};
