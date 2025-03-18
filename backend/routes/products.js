const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const Category = require("../models/Category");
const { protect, admin } = require("../middleware/auth");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // Filtering
    const category = req.query.category ? { category: req.query.category } : {};
    const searchKeyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    // Pagination
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Product.countDocuments({
      ...category,
      ...searchKeyword,
    });

    const products = await Product.find({ ...category, ...searchKeyword })
      .populate("category", "name")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  })
);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
      name,
      description,
      richDescription,
      brand,
      price,
      category,
      countInStock,
      specifications,
      images,
    } = req.body;

    const product = new Product({
      name,
      description,
      richDescription,
      brand,
      price,
      category,
      countInStock,
      specifications,
      images,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })
);

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
      name,
      description,
      richDescription,
      brand,
      price,
      category,
      countInStock,
      specifications,
      images,
      isFeatured,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.richDescription = richDescription || product.richDescription;
      product.brand = brand || product.brand;
      product.price = price || product.price;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;
      product.specifications = specifications || product.specifications;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// @desc    Get featured products
// @route   GET /api/products/featured/:count
// @access  Public
router.get(
  "/featured/:count",
  asyncHandler(async (req, res) => {
    const count = req.params.count ? Number(req.params.count) : 8;
    const products = await Product.find({ isFeatured: true })
      .populate("category", "name")
      .limit(count);

    res.json(products);
  })
);

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
router.get(
  "/categories/all",
  asyncHandler(async (req, res) => {
    const categories = await Category.find({}).sort({ name: 1 });
    res.json(categories);
  })
);

module.exports = router;
