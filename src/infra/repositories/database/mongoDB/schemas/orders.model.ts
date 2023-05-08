import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    billing: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    shipping: {
      address: { type: String, required: true },
      country: { type: String, required: true },
      zip: { type: Number, required: true },
      city: { type: String, required: true },
    },
    payment: {
      paymentMethod: { type: String, required: true },
      eMoneyNumber: { type: Number, required: true },
      eMoneyPIN: { type: Number, required: true },
    },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Carts" },
    orderStatus: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Orders", Schema);
