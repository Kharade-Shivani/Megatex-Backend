const BannerModel = require("../Models/BannerModel");
const cloudinary = require("../config/cloudinaryConfig");
require("dotenv").config();

// 🟢 Create Banner
const create_Banner = async (req, res) => {
  try {
    let bannerData = {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU',
      status: "active"
    };
    // If req.body exists, override with provided values
    if (req.body) {
      if (req.body.image) bannerData.image = req.body.image;
      if (req.body.status) bannerData.status = req.body.status;
    }
    const Create_Banner = await BannerModel.create(bannerData);
    res.status(200).json({
      msg: "Banner created successfully!",
      data: Create_Banner,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error creating banner: ${error.message}`,
      status: false
    });
  }
};

// 🟢 Get All Banners
const getAllBanner = async (req, res) => {
  try {
    const GetAllBanner = await BannerModel.find();
    if (GetAllBanner && GetAllBanner.length > 0) {
      res.status(200).json(GetAllBanner);
    } else {
      res.status(404).json({ msg: "No banners found", status: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error fetching all banners: ${error.message}`, status: false });
  }
};

// 🟢 Get Banner By ID
const get_Banner_by_Id = async (req, res) => {
  try {
    const GetBannerById = await BannerModel.findById(req.params.id);
    if (GetBannerById) {
      res.status(200).json(GetBannerById);
    } else {
      res.status(404).json({ msg: "Banner not found", status: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error fetching banner by ID: ${error.message}`, status: false });
  }
};

// 🟢 Update Banner
const update_Banner = async (req, res) => {
  try {
    const BannerId = req.body._id;
    const BannerDb = req.body;
    const Update_Banner = await BannerModel.findByIdAndUpdate(BannerId, BannerDb, {
      new: true,
    });
    if (Update_Banner) {
      res.status(200).json({
        msg: "Banner updated successfully",
        data: Update_Banner,
        status: true,
      });
    } else {
      res.status(404).json({ msg: "Banner not found", status: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error updating banner: ${error.message}`, status: false });
  }
};

// 🟢 Delete Banner
const delete_Banner = async (req, res) => {
  try {
    const GetByIDBanner = await BannerModel.findById(req.params.id);
    if (GetByIDBanner) {
      await BannerModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "Banner deleted successfully", status: true });
    } else {
      res.status(404).json({ msg: "Banner not found", status: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: `Error deleting banner: ${error.message}`, status: false });
  }
};

// 🟢 File Upload
const fileupload = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Upload file to Cloudinary inside your project folder name from .env
    // const folderName = process.env.PROJECT_NAME || "Default_Folder";

    cloudinary.uploader
      .upload_stream({ folder: "Megatex" }, (error, result) => {
        if (error) {
          console.error("Error uploading image to Cloudinary:", error);
          res.status(400).json({
            msg: "Error uploading image to Cloudinary",
            status: false,
          });
        } else {
          res.status(200).json({
            path: result.secure_url,
            status: true,
          });
        }
      })
      .end(req.file.buffer);
  } catch (error) {
    console.log(`Error uploading file: ${error}`);
    res
      .status(500)
      .json({ msg: `Internal Server Error: ${error.message}`, status: false });
  }
};

module.exports = {
  create_Banner,
  getAllBanner,
  get_Banner_by_Id,
  update_Banner,
  delete_Banner,
  fileupload,
};
