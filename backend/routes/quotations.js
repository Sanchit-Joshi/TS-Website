const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Quotation = require("../models/Quotation");
const { protect } = require("../middleware/auth");

// @desc    Create new quotation request
// @route   POST /api/quotations
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { products, companyName, contactPerson, email, phone, message } =
      req.body;

    if (!products || products.length === 0) {
      res.status(400);
      throw new Error("No products selected for quotation");
    }

    const quotation = new Quotation({
      user: req.user._id,
      products,
      companyName,
      contactPerson,
      email,
      phone,
      message,
      status: "pending",
    });

    const createdQuotation = await quotation.save();
    res.status(201).json(createdQuotation);
  })
);

// @desc    Get user quotations
// @route   GET /api/quotations/myquotations
// @access  Private
router.get(
  "/myquotations",
  protect,
  asyncHandler(async (req, res) => {
    const quotations = await Quotation.find({ user: req.user._id }).populate(
      "products.product",
      "name price images"
    );
    res.json(quotations);
  })
);

// @desc    Get quotation by ID
// @route   GET /api/quotations/:id
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const quotation = await Quotation.findById(req.params.id).populate(
      "products.product",
      "name price images description"
    );

    if (quotation) {
      // Check if the quotation belongs to the user or user is admin
      if (
        quotation.user.toString() !== req.user._id.toString() &&
        !req.user.isAdmin
      ) {
        res.status(401);
        throw new Error("Not authorized to view this quotation");
      }

      res.json(quotation);
    } else {
      res.status(404);
      throw new Error("Quotation not found");
    }
  })
);

// @desc    Update quotation status (admin only)
// @route   PUT /api/quotations/:id/status
// @access  Private/Admin
router.put(
  "/:id/status",
  protect,
  asyncHandler(async (req, res) => {
    const { status, adminResponse } = req.body;
    const quotation = await Quotation.findById(req.params.id);

    if (quotation) {
      // Only admin can update status
      if (!req.user.isAdmin) {
        res.status(401);
        throw new Error("Not authorized to update quotation status");
      }

      quotation.status = status || quotation.status;
      quotation.adminResponse = adminResponse || quotation.adminResponse;
      quotation.respondedAt = Date.now();

      const updatedQuotation = await quotation.save();
      res.json(updatedQuotation);
    } else {
      res.status(404);
      throw new Error("Quotation not found");
    }
  })
);

// @desc    Get all quotations (admin only)
// @route   GET /api/quotations/admin/all
// @access  Private/Admin
router.get(
  "/admin/all",
  protect,
  asyncHandler(async (req, res) => {
    // Only admin can view all quotations
    if (!req.user.isAdmin) {
      res.status(401);
      throw new Error("Not authorized to view all quotations");
    }

    const quotations = await Quotation.find({}).populate("user", "name email");
    res.json(quotations);
  })
);

module.exports = router;
