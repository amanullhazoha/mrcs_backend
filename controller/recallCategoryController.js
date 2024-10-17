const RecallCategory = require("../models/RecallCategorySchema");
const cloudinary = require("cloudinary").v2;
const upload = require("../middleware/uploadMiddleware");

const getRecallCategory = async (req, res, next) => {
  try {
    const recallCategory = await RecallCategory.find()
      .sort({ updatedAt: -1 })
      .exec();

    res.json(recallCategory);
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

const getSingleRecallCategory = async (req, res, next) => {
  try {
    const recallCategory = await RecallCategory.findById(req.params.id);

    res.json(recallCategory);
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

const addRecallCategory = async (req, res) => {
  console.log(req);

  try {
    const { cat_name, cat_status, create_date } = req.body;

    const newRecallCategory = new RecallCategory({
      cat_name,
      cat_status,
      create_date,
    });
    if (req.file) {
      cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
          console.log(err);
          throw new Error("Image upload failed");
        }

        newRecallCategory.image = result.secure_url;
        newRecallCategory.publicid = result.public_id;

        await newRecallCategory.save();

        res.status(200).json({ success: true, data: newRecallCategory });
      });
    } else {
      await newRecallCategory.save();
      res.status(200).json({ success: true, data: newRecallCategory });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateRecallCategory = async (req, res, next) => {
  try {
    const { cat_name, cat_status, create_date } = req.body;
    const { id } = req.params;

    const recallCategory = await RecallCategory.findById(id);

    if (!recallCategory) {
      return res
        .status(404)
        .json({ success: false, error: "Recall category not found" });
    }
    recallCategory.cat_name = cat_name;
    recallCategory.cat_status = cat_status;
    recallCategory.create_date = create_date;

    if (req.file) {
      cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
          console.log(err);
          throw new Error("Image uplaod failed");
        }
        recallCategory.image = result.secure_url;
        recallCategory.publicid = result.public_id;

        await recallCategory.save();
        res.json({ success: true, data: recallCategory });
      });
    } else {
      await recallCategory.save();
      res.json({ success: true, data: recallCategory });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteRecallCategory = async (req, res, next) => {
  const id = req.params.id;

  RecallCategory.findByIdAndDelete(id, function (err, recallCategoryData) {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Failed to delete recall category Data from database" });
    }
    if (!recallCategoryData) {
      return res.status(404).json({ error: "Recall category Data not Found" });
    }
    if (recallCategoryData?.publicid) {
      cloudinary.uploader.destroy(
        recallCategoryData.publicid,
        function (err, result) {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ error: "Failded to delete image from Cloudinary" });
          }
          console.log(result);
          res
            .status(200)
            .json({ message: "Recall category data deleted successfully" });
        }
      );
    } else {
      res
        .status(200)
        .json({ message: "Recall category data deleted successfully" });
    }
  });
};

module.exports = {
  getRecallCategory,
  addRecallCategory,
  updateRecallCategory,
  deleteRecallCategory,
  getSingleRecallCategory,
};
