import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  creationDate: { type: Date, required: true },
  category: { type: String, required: true },
  features: { type: String, required: true },
  images: { thumbnail: { type: String }, presentation: [] },
  inTheBox: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

export default mongoose.model("Products", Schema);
