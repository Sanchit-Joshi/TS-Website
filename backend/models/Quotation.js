const mongoose = require("mongoose");

const quotationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    phone: {
      type: String,
      required: [true, "Please add your phone number"],
    },
    company: {
      type: String,
    },
    productType: {
      type: String,
      required: [true, "Please specify the product type"],
      enum: ["Transformer", "UPS System", "Inverter", "Stabilizer", "Other"],
    },
    requirements: {
      type: String,
      required: [true, "Please describe your requirements"],
    },
    attachments: [
      {
        type: String, // File paths
      },
    ],
    status: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Pending", "Reviewed", "Quoted", "Accepted", "Rejected"],
    },
    quotedPrice: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
    },
    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Quotation = mongoose.model("Quotation", quotationSchema);

module.exports = Quotation;
