const TarpaulinModel = require("../Models/TarpaulinModel");
const cloudinary = require("../config/cloudinaryConfig");
require("dotenv").config();

// 🟢 Create Tarpaulin
const create_Tarpaulin = async (req, res) => {
  try {
    let tarpaulinData = {
      tarpaulin_image:
        req.body.tarpaulin_image ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU",
      tarpaulin_title: req.body.tarpaulin_title,
      tarpaulin_description: req.body.tarpaulin_description,
      status: "active",
    };

    // 🛑 Validation
    if (!tarpaulinData.tarpaulin_title || !tarpaulinData.tarpaulin_description) {
      return res
        .status(400)
        .json({ msg: "All fields are required", status: false });
    }

    // ✅ Upload image if file provided
    if (req.file) {
      const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "Megatex/Tarpaulin" }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          })
          .end(req.file.buffer);
      });
      tarpaulinData.tarpaulin_image = uploadedImage;
    }

    const newTarpaulin = await TarpaulinModel.create(tarpaulinData);
    res.status(200).json({
      msg: "Tarpaulin created successfully!",
      data: newTarpaulin,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error creating Tarpaulin: ${error.message}`,
      status: false,
    });
  }
};

// 🟢 Get All Tarpaulins
const getAllTarpaulin = async (req, res) => {
  try {
    const tarpaulins = await TarpaulinModel.find().sort({ createdAt: -1 });
    if (tarpaulins.length > 0) {
      res.status(200).json(tarpaulins);
    } else {
      res
        .status(404)
        .json({ msg: "No Tarpaulin records found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching Tarpaulin: ${error.message}`,
      status: false,
    });
  }
};

// 🟢 Get Tarpaulin By ID
const get_Tarpaulin_By_Id = async (req, res) => {
  try {
    const tarpaulin = await TarpaulinModel.findById(req.params.id);
    if (tarpaulin) {
      res.status(200).json(tarpaulin);
    } else {
      res.status(404).json({ msg: "Tarpaulin not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching Tarpaulin: ${error.message}`,
      status: false,
    });
  }
};

// 🟢 Update Tarpaulin
const update_Tarpaulin = async (req, res) => {
  try {
    const tarpaulinId = req.body._id;
    if (!tarpaulinId) {
      return res
        .status(400)
        .json({ msg: "Tarpaulin ID is required", status: false });
    }

    let tarpaulinData = {
      tarpaulin_title: req.body.tarpaulin_title,
      tarpaulin_description: req.body.tarpaulin_description,
      status: req.body.status || "active",
    };

    // ✅ Update image from body or new upload
    if (req.body.tarpaulin_image) {
      tarpaulinData.tarpaulin_image = req.body.tarpaulin_image;
    }
    if (req.file) {
      const uploadedImage = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "Megatex/Tarpaulin" }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          })
          .end(req.file.buffer);
      });
      tarpaulinData.tarpaulin_image = uploadedImage;
    }

    const updatedTarpaulin = await TarpaulinModel.findByIdAndUpdate(
      tarpaulinId,
      tarpaulinData,
      { new: true }
    );

    if (updatedTarpaulin) {
      res.status(200).json({
        msg: "Tarpaulin updated successfully!",
        data: updatedTarpaulin,
        status: true,
      });
    } else {
      res.status(404).json({ msg: "Tarpaulin not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      msg: `Error updating Tarpaulin: ${error.message}`,
      status: false,
    });
  }
};

// 🟢 Delete Tarpaulin
const delete_Tarpaulin = async (req, res) => {
  try {
    const tarpaulin = await TarpaulinModel.findById(req.params.id);
    if (!tarpaulin) {
      return res.status(404).json({ msg: "Tarpaulin not found", status: false });
    }

    await TarpaulinModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Tarpaulin deleted successfully", status: true });
  } catch (error) {
    res.status(500).json({
      msg: `Error deleting Tarpaulin: ${error.message}`,
      status: false,
    });
  }
};

// 🟢 Cloudinary File Upload
const fileupload = (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ msg: "No image file provided", status: false });
    }

    cloudinary.uploader
      .upload_stream({ folder: "Megatex/Tarpaulin" }, (error, result) => {
        if (error) {
          res
            .status(400)
            .json({ msg: "Error uploading image", status: false });
        } else {
          res.status(200).json({ path: result.secure_url, status: true });
        }
      })
      .end(req.file.buffer);
  } catch (error) {
    res.status(500).json({
      msg: `Error uploading file: ${error.message}`,
      status: false,
    });
  }
};

module.exports = {
  create_Tarpaulin,
  getAllTarpaulin,
  get_Tarpaulin_By_Id,
  update_Tarpaulin,
  delete_Tarpaulin,
  fileupload,
};
