import mongoose from "mongoose";
// const USER_NAME = "akiran1sei";
// const USER_PASSWD = "akiran1sei";
// const HOST_NAME = "cluster0.rp1u5ye.mongodb.net";
// const DB_NAME = "test";
const uri = `mongodb+srv://akiran1sei:akiran1sei@cluster0.rp1u5ye.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = `mongodb+srv://${USER_NAME}:${USER_PASSWD}@${HOST_NAME}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(uri);
const connectDB = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(uri);
    console.log("Success: Connected to MongoDB");
  } catch (err) {
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
};

export default connectDB;
