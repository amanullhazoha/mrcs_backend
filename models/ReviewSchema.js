const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: 'People',
    },
    user_profile_image: {
      type: String,
    },
    user_name: {
      type: String,
    },
    rating: {
        type: Number,
    },
    review: {
        type: String,
    },
    status: {
        type: String,
        default: "hide",
        enum: ["hide", "show"],
    },
  },
  { timestamps: true },
);

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;
