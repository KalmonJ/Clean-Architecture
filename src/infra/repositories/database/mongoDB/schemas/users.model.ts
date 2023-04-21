import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  id: { type: String, required: true },
  image: { type: String },
  username: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("Users", Schema);
