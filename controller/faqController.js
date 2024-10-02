const FAQ = require("../models/FAQSchema");

// get All faq Api
const getFaq = async (req, res, next) => {
  try {
    const [faq] = await FAQ.find().sort({ updatedAt: -1 }).exec();
    res.json(faq);
  } catch (err) {
    return res.status(500).json({
      errors: {
        common: {
          msg: `Unknown error occured ! ${err}`,
        },
      },
    });
  }
};

//get Single Package Api
const getSingleFaq = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    res.json(faq);
  } catch (err) {
    return res.status(500).json({
      errors: {
        common: {
          msg: `Unknown error occured ! ${err}`,
        },
      },
    });
  }
};

// Add faq Api Controller
const addFaq = async (req, res) => {
  try {
    const { faq_title, faq_description } = req.body;

    // Create a new faq
    const newFaq = new FAQ({
      faq_title,
      faq_description,
    });

    await newFaq.save();
    res.status(201).json({ success: true, data: newFaq });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Category Api Controller
const updateFaq = async (req, res, next) => {
  try {
    const { faq_title, faq_description } = req.body;
    const { id } = req.params;

    // Find the faq by ID
    const faq = await FAQ.findById(id);

    if (!faq) {
      return res.status(404).json({ success: false, error: "Faq not found" });
    }

    faq.faq_title = faq_title;
    faq.faq_description = faq_description;

    await faq.save();

    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete faq Api Controller
const deleteFaq = async (req, res, next) => {
  const id = req.params.id;

  try {
    const faqData = await FAQ.findByIdAndDelete(id);

    if (!faqData) {
      return res.status(404).json({ error: "Faq data not found" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting study data:", error);
    res.status(500).json({ error: "Failed to delete recall data from server" });
  }
};

module.exports = {
  getFaq,
  addFaq,
  updateFaq,
  deleteFaq,
  getSingleFaq,
};
