import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  user: {
    type: Object,
  },
  data: { // 결제정보
    type: Array,
    default: [],
  },
  product: {
    type: Array,
    default: [],
  }
}, { timestamps: true })

const Payment = mongoose.model("Payment", paymentSchema);

model.exports = Payment;