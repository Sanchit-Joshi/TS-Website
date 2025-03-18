const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { protect, admin } = require("../middleware/auth");

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;

      if (req.body.address) {
        user.address = {
          street: req.body.address.street || user.address?.street,
          city: req.body.address.city || user.address?.city,
          state: req.body.address.state || user.address?.state,
          postalCode: req.body.address.postalCode || user.address?.postalCode,
          country: req.body.address.country || user.address?.country,
        };
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist
// @access  Private
router.post(
  "/wishlist",
  protect,
  asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      // Check if product already in wishlist
      const alreadyInWishlist = user.wishlist.find(
        (id) => id.toString() === productId
      );

      if (alreadyInWishlist) {
        res.status(400);
        throw new Error("Product already in wishlist");
      }

      user.wishlist.push(productId);
      await user.save();
      res.status(201).json({ message: "Product added to wishlist" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:id
// @access  Private
router.delete(
  "/wishlist/:id",
  protect,
  asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const user = await User.findById(req.user._id);

    if (user) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
      await user.save();
      res.json({ message: "Product removed from wishlist" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
router.get(
  "/wishlist",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("wishlist");

    if (user) {
      res.json(user.wishlist);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: "User removed" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
router.get(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
router.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin =
        req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

module.exports = router;
