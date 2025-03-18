const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a product description"],
    },
    richDescription: {
      type: String,
      default: "",
    },
    specifications: [
      {
        key: String,
        value: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    brand: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create a virtual field for formatted price
productSchema.virtual("formattedPrice").get(function () {
  return this.price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
