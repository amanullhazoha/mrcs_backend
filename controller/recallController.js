const multer = require("multer");
const Recall = require("../models/RecallSchema");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const util = require("util");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "mrcs",
  allowedFormats: null,
  transformation: [{ width: 500, height: 500, crop: "limit" }],
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadMiddleware = multer({
  storage: storage,
}).single("image");

const cloudinaryUpload = util.promisify(cloudinary.uploader.upload);

const addRecall = async (req, res) => {
  try {
    const {
      category,
      recall_name,
      recall_title,
      text1,
      text2,
      text3,
      recall_description,
      link,
      status,
      accessibility
    } = req.body;

    const newRecall = new Recall({
      category,
      recall_name,
      recall_title,
      text1,
      text2,
      text3,
      link,
      recall_description,
      status,
      accessibility
    });

    if (req.file) {
      try {
        const result = await cloudinaryUpload(req.file.path);
        newRecall.image = result.secure_url;
        newRecall.publicid = result.public_id;
      } catch (error) {
        console.error("Image upload failed:", error);
        return res
          .status(500)
          .json({ success: false, error: "Image upload failed" });
      }
    }

    await newRecall.save();
    res.status(201).json({ success: true, data: newRecall });
  } catch (error) {
    console.error("Error adding recall:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateRecall = async (req, res) => {
  try {
    const {
      recall_name,
      recall_title,
      text1,
      text2,
      text3,
      recall_description,
      link,
      status,
      category,
      accessibility
    } = req.body;
    const { id } = req.params;

    const recall = await Recall.findById(id);

    if (!recall) {
      return res
        .status(404)
        .json({ success: false, error: "Recall not found" });
    }

    for (const prop of [
      "recall_name",
      "recall_title",
      "text1",
      "text2",
      "text3",
      "recall_description",
      "link",
      "status",
      "category",
      "accessibility"
    ]) {
      recall[prop] = req.body[prop];
    }

    if (req.file) {
      try {
        const result = await cloudinaryUpload(req.file.path);
        recall.image = result.secure_url;
        recall.publicid = result.public_id;
      } catch (error) {
        console.error("Image upload failed:", error);
        return res
          .status(500)
          .json({ success: false, error: "Image upload failed" });
      }
    }

    await recall.save();
    res.json({ success: true, data: recall });
  } catch (error) {
    console.error("Error updating recall:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllRecallData = async (req, res) => {
  try {
    const recallData = await Recall.find().sort({ updatedAt: -1 }).exec();
    res.status(200).json(recallData);
  } catch (error) {
    console.error("Error retrieving recall data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving recall data" });
  }
};

const getCategory_NameWise_AllRecall = async (req, res, next) => {
  const categoryName = req.query.category; // retrieve category name from query parameter
  const status = "active";
  
  try {
    if (!categoryName) {
      return res.status(400).json({
        errors: {
          common: {
            msg: `Category name is required in the query parameter!`,
          },
        },
      });
    }

    const recall = await Recall.find({
      category: categoryName,
      quiz_status: status,
    })
      .sort({ updatedAt: -1 })
      .exec();
    if (!recall || recall.length === 0) {
      return res.status(404).json({
        errors: {
          common: {
            msg: `No quiz found for category ${categoryName}!`,
          },
        },
      });
    }
    res.json(recall);
  } catch (err) {
    return res.status(500).json({
      errors: {
        common: {
          msg: `Unknown error occurred! ===> ${err}`,
        },
      },
    });
  }
};

const getRecallbyId = async (req, res) => {
  const { id } = req.params;

  try {
    const recallData = await Recall.findById(id);
    if (recallData) {
      res.status(200).json(recallData);
    } else {
      res.status(404).json({ error: "Recall data not found" });
    }
  } catch (error) {
    console.error("Error retrieving recall data by ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving recall data" });
  }
};

const deleteRecall = async (req, res) => {
  const id = req.params.id;

  try {
    const recallData = await Recall.findByIdAndDelete(id);

    if (!recallData) {
      return res.status(404).json({ error: "Recall data not found" });
    }

    if (recallData?.publicid) {
      await cloudinary.uploader.destroy(recallData.publicid);
    }

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting study data:", error);
    res.status(500).json({ error: "Failed to delete recall data from server" });
  }
};

module.exports = {
  addRecall,
  updateRecall,
  getRecallbyId,
  getAllRecallData,
  deleteRecall,
  uploadMiddleware,
  getCategory_NameWise_AllRecall
};
