const CategoryModel = require("../Models/CategoryModel");
const cloudinary = require("../config/cloudinaryConfig");
require("dotenv").config();

// 🟢 Create Category
const create_Category = async (req, res) => {
  try {
    let categoryData = {
      name: req.body.name || "Untitled Category",
      image:
        req.body.image ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU",
      status: req.body.status || "active", // ✅ Added status
    };

    const createCategory = await CategoryModel.create(categoryData);
    res.status(200).json({
      msg: "Category created successfully!",
      data: createCategory,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error creating category: ${error.message}`,
      status: false,
    });
  }
};

// 🟢 Get All Categories
const getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    if (categories.length > 0) {
      res.status(200).json(categories);
    } else {
      res.status(404).json({ msg: "No categories found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching categories: ${error.message}`,
      status: false,
    });
  }
};

// 🟢 Get Category By ID
const get_Category_by_Id = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ msg: "Category not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      msg: `Error fetching category by ID: ${error.message}`,
      status: false,
    });
  }
};

// 🟢 Update Category
const update_Category = async (req, res) => {
  try {
    const categoryId = req.body._id;
    const updateData = {
      name: req.body.name,
      image: req.body.image,
      status: req.body.status, // ✅ Allow status update
    };

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true }
    );

    if (updatedCategory) {
      res.status(200).json({
        msg: "Category updated successfully",
        data: updatedCategory,
        status: true,
      });
    } else {
      res.status(404).json({ msg: "Category not found", status: false });
    }
  } catch (error) {
    res.status(500).json({
      msg: `Error updating category: ${error.message}`,
      status: false,
    });
  }
};

// 🟢 Delete Category
const delete_Category = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found", status: false });
    }

    await CategoryModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Category deleted successfully", status: true });
  } catch (error) {
    res.status(500).json({
      msg: `Error deleting category: ${error.message}`,
      status: false,
    });
  }
};

// 🟢 File Upload (Cloudinary)
const fileupload = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    cloudinary.uploader
      .upload_stream({ folder: "Megatex/Category" }, (error, result) => {
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
    res.status(500).json({
      msg: `Error uploading file: ${error.message}`,
      status: false,
    });
  }
};

module.exports = {
  create_Category,
  getAllCategory,
  get_Category_by_Id,
  update_Category,
  delete_Category,
  fileupload,
};
