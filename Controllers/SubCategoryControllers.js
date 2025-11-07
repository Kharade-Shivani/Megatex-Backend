const SubCategoryModel = require("../Models/SubCategoryModel");
const CategoryModel = require("../Models/CategoryModel");

// 🟢 Create SubCategory
const create_SubCategory = async (req, res) => {
  try {
    const { categoryId, gsm_name, gsm_image, status } = req.body;

    const categoryExists = await CategoryModel.findById(categoryId);
    if (!categoryExists) return res.status(404).json({ msg: "Category not found", status: false });

    const subcategory = await SubCategoryModel.create({
      categoryId,
      gsm_name,
      gsm_image,
      status: status || "active",
    });

    res.status(200).json({
      msg: "SubCategory created successfully!",
      data: subcategory,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ msg: `Error creating subcategory: ${error.message}`, status: false });
  }
};

// 🟢 Get All SubCategories
const getAllSubCategory = async (req, res) => {
  try {
    const subcategories = await SubCategoryModel.find().populate("categoryId", "name");
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ msg: `Error fetching subcategories: ${error.message}`, status: false });
  }
};

// 🟢 Get SubCategory By ID
const get_SubCategory_by_Id = async (req, res) => {
  try {
    const subcategory = await SubCategoryModel.findById(req.params.id).populate("categoryId", "name");
    if (!subcategory) return res.status(404).json({ msg: "SubCategory not found", status: false });
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ msg: `Error fetching subcategory: ${error.message}`, status: false });
  }
};

// 🟢 Update SubCategory
const update_SubCategory = async (req, res) => {
  try {
    const updated = await SubCategoryModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
    res.status(200).json({ msg: "SubCategory updated successfully", data: updated, status: true });
  } catch (error) {
    res.status(500).json({ msg: `Error updating subcategory: ${error.message}`, status: false });
  }
};

// 🟢 Delete SubCategory
const delete_SubCategory = async (req, res) => {
  try {
    await SubCategoryModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "SubCategory deleted successfully", status: true });
  } catch (error) {
    res.status(500).json({ msg: `Error deleting subcategory: ${error.message}`, status: false });
  }
};

module.exports = {
  create_SubCategory,
  getAllSubCategory,
  get_SubCategory_by_Id,
  update_SubCategory,
  delete_SubCategory,
};
