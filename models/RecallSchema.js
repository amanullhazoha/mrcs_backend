const mongoose = require("mongoose");

const recallSchema = new mongoose.Schema(
  {
    recall_name: {
      type: String,
      required: [true, "Please provide recall name"],
    },
    recall_title: {
      type: String,
    },
    text1: {
      type: String,
    },
    text2: {
      type: String,
    },
    text3: {
      type: String,
    },

    image: {
      type: String,
    },
    publicid: {
      type: String,
    },
    recall_description: {
      type: String,
    },
    accessibility: {
      type: String,
      default: "unpaid",
      enum: ["paid", "unpaid"],
    },
    category: {
      type: String,
      required: [true, "Please provide category name"],
    },
    status: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true },
);

const Recall = mongoose.model("recall", recallSchema);
module.exports = Recall;
