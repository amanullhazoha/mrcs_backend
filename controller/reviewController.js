const Review = require("../models/ReviewSchema");

// get All faq Api
const getReview = async (req, res, next) => {
  try {
    const review = await Review.find().sort({ updatedAt: -1 }).exec();
    res.json(review);
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

// get All show review Api
const getShowReview = async (req, res, next) => {
    try {
      const review = await Review.find({ status: "show" }).sort({ updatedAt: -1 }).exec();
      res.json(review);
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
const getSingleReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    res.json(review);
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
const addReview = async (req, res) => {
  try {
    const { rating, review,  } = req.body;

    // Create a new faq
    const newReview = new Review({
      rating,
      review,
    });

    await newReview.save();
    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Category Api Controller
const updateReview = async (req, res, next) => {
  try {
    const { rating, review, status  } = req.body;
    const { id } = req.params;

    // Find the faq by ID
    const reviewData = await Review.findById(id);

    if (!reviewData) {
      return res.status(404).json({ success: false, error: "Review not found" });
    }

    reviewData.rating = rating;
    reviewData.review = review;
    reviewData.status = status;

    await faq.save();

    res.status(200).json({ success: true, data: reviewData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete faq Api Controller
const deleteReview = async (req, res, next) => {
  const id = req.params.id;

  try {
    const reviewData = await Review.findByIdAndDelete(id);

    if (!reviewData) {
      return res.status(404).json({ error: "Faq data not found" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting study data:", error);
    res.status(500).json({ error: "Failed to delete recall data from server" });
  }
};

module.exports = {
    getReview,
    addReview,
    updateReview,
    deleteReview,
    getShowReview,
    getSingleReview,
};
