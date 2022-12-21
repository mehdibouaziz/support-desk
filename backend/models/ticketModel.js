const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["iPhone", "MacBook", "iPad", "iMac", "Watch", "AirPods"],
    },
    model: {
      type: String,
      required: [true, "Please specify the model of your device"],
    },
    description: {
      type: String,
      required: [true, "Please type a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "close"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
