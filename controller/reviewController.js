const Review = require("../models/ReviewSchema");
const User = require("../models/People");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

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

const getLoggedInUserReview = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    const review = await Review.findOne({ userId });

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
    const userId = req?.user?.id;

    const user = await User.findById(userId);
    
    const newReview = new Review({
      userId,
      rating,
      review,
      user_name: user?.name,
      user_profile_image: user?.profile
    });

    await newReview.save();
    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const addReviewForAdmin = async (req, res) => {
  try {
    const { rating, review, user_name, status } = req.body;
    const userId = req?.user?.id;

    const user = await User.findById(userId);

    if (req.file) {
      cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Image upload failed",
          });
        }

        const newReview = new Review({
          userId,
          rating,
          review,
          status,
          user_name,
          publicid: result.public_id,
          user_profile_image: result.secure_url
        });
    
        await newReview.save();

        return res.status(201).json({
          success: true,
          message: "Review add successfully!",
        });
      });
    } else {
      const newReview = new Review({
        userId,
        rating,
        review,
        status,
        user_name,
        user_profile_image: user?.profile
      });
  
      await newReview.save();

      return res.status(201).json({
        success: true,
        message: "Review add successfully!",
      });
    }
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

    if (req.file) {
      if (reviewData?.publicid) {
        await cloudinary.uploader.destroy(reviewData?.publicid);
      }

      cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Image upload failed",
          });
        }

        reviewData.user_profile_image = result.secure_url;
        reviewData.publicid = result.public_id;

        await reviewData.save();

        return res.status(200).json({
          success: true,
          message: "Review updated successfully!",
        });
      });
    } else {
      await reviewData.save();

      return res.status(200).json({
        success: true,
        message: "Review updated successfully!",
      });
    }
  } catch (error) {
    console.log(error)
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
    addReviewForAdmin,
    getLoggedInUserReview
};
