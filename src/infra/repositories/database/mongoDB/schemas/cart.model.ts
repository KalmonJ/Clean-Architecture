import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  items: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
  ],
});

export default mongoose.model("Carts", Schema);
