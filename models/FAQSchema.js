const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    faq_title: {
      type: String,
    },
    faq_description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

const FAQ = mongoose.model("faq", faqSchema);
module.exports = FAQ;
