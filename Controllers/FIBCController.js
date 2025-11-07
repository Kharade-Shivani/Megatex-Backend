const FIBCModel = require("../Models/FIBCModel");
const cloudinary = require("../config/cloudinaryConfig");
require("dotenv").config();

// 🟢 Create FIBC
const create_FIBC = async (req, res) => {
  try {
    let fibcData = {
      fibc_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU",
      fibc_title: req.body.fibc_title,
      fibc_specification: req.body.fibc_specification,
      status: req.body.status || "active",
    };

    // ✅ If image is provided in body, override default
    if (req.body.fibc_image) {
      fibcData.fibc_image = req.body.fibc_image;
    }

    if (!fibcData.fibc_title || !fibcData.fibc_specification) {
      return res
        .status(400)
        .json({ msg: "All fields are required", status: false });
    }

    const newFIBC = await FIBCModel.create(fibcData);
    res.status(200).json({
      msg: "FIBC created successfully!",
      data: newFIBC,
      status: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error creating FIBC: ${error.message}`, status: false });
  }
};

// 🟢 Get All FIBC
const getAllFIBC = async (req, res) => {
  try {
    const fibcList = await FIBCModel.find().sort({ createdAt: -1 });
    if (fibcList.length > 0) {
      res.status(200).json(fibcList);
    } else {
      res.status(404).json({ msg: "No FIBC records found", status: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error fetching FIBC: ${error.message}`, status: false });
  }
};

// 🟢 Get FIBC By ID
const get_FIBC_By_Id = async (req, res) => {
  try {
    const fibc = await FIBCModel.findById(req.params.id);
    if (fibc) {
      res.status(200).json(fibc);
    } else {
      res.status(404).json({ msg: "FIBC not found", status: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error fetching FIBC: ${error.message}`, status: false });
  }
};

// 🟢 Update FIBC
const update_FIBC = async (req, res) => {
  try {
    const fibcId = req.body._id;
    if (!fibcId)
      return res.status(400).json({ msg: "FIBC ID is required", status: false });

    const fibcData = req.body;

    // ✅ If image provided in body, update
    if (req.body.fibc_image) {
      fibcData.fibc_image = req.body.fibc_image;
    }

    const updatedFIBC = await FIBCModel.findByIdAndUpdate(fibcId, fibcData, {
      new: true,
    });

    if (updatedFIBC) {
      res.status(200).json({
        msg: "FIBC updated successfully!",
        data: updatedFIBC,
        status: true,
      });
    } else {
      res.status(404).json({ msg: "FIBC not found", status: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error updating FIBC: ${error.message}`, status: false });
  }
};

// 🟢 Delete FIBC
const delete_FIBC = async (req, res) => {
  try {
    const fibc = await FIBCModel.findById(req.params.id);
    if (!fibc) return res.status(404).json({ msg: "FIBC not found", status: false });

    await FIBCModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "FIBC deleted successfully", status: true });
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error deleting FIBC: ${error.message}`, status: false });
  }
};

// 🟢 Cloudinary File Upload (like Banner)
const fileupload = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    cloudinary.uploader
      .upload_stream({ folder: "Megatex/FIBC" }, (error, result) => {
        if (error) {
          res
            .status(400)
            .json({ msg: "Error uploading image", status: false });
        } else {
          res.status(200).json({
            path: result.secure_url,
            status: true,
          });
        }
      })
      .end(req.file.buffer);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error uploading file: ${error.message}`, status: false });
  }
};

module.exports = {
  create_FIBC,
  getAllFIBC,
  get_FIBC_By_Id,
  update_FIBC,
  delete_FIBC,
  fileupload,
};
