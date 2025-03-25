import Quotation from "../models/Quotation";

// @desc    Create new quotation
// @route   POST /api/quotations
// @access  Private
export const createQuotation = async (req, res) => {
  try {
    const quotation = new Quotation({
      user: req.user.id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      company: req.body.company,
      productType: req.body.productType,
      requirements: req.body.requirements,
      attachments: req.body.attachments,
    });

    const createdQuotation = await quotation.save();
    res.status(201).json(createdQuotation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get quotation by ID
// @route   GET /api/quotations/:id
// @access  Private
export const getQuotationById = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);

    // Check if user is admin or quotation owner
    if (!req.user.isAdmin && quotation.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (quotation) {
      res.json(quotation);
    } else {
      res.status(404).json({ message: "Quotation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user quotations
// @route   GET /api/quotations/myquotations
// @access  Private
export const getMyQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find({ user: req.user.id }).sort(
      "-createdAt"
    );
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all quotations
// @route   GET /api/quotations
// @access  Private/Admin
export const getQuotations = async (req, res) => {
  try {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;

    const count = await Quotation.countDocuments({});
    const quotations = await Quotation.find({})
      .populate("user", "name email")
      .sort("-createdAt")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      quotations,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update quotation status
// @route   PUT /api/quotations/:id
// @access  Private/Admin
export const updateQuotationStatus = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);

    if (quotation) {
      quotation.status = req.body.status || quotation.status;
      quotation.quotedPrice = req.body.quotedPrice || quotation.quotedPrice;
      quotation.notes = req.body.notes || quotation.notes;
      quotation.adminNotes = req.body.adminNotes || quotation.adminNotes;

      const updatedQuotation = await quotation.save();
      res.json(updatedQuotation);
    } else {
      res.status(404).json({ message: "Quotation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
