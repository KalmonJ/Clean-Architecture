import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    items: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
    ],
    vat: { type: Number, required: true },
    total: { type: Number, required: true },
    finalPrice: { type: Number, required: true },
    totalWithVat: { type: Number, required: true },
    shippingValue: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Carts", Schema);
