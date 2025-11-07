const ProductModel = require("../Models/ProductModel");
const CategoryModel = require("../Models/CategoryModel");
const SubCategoryModel = require("../Models/SubCategoryModel");
const cloudinary = require("../config/cloudinaryConfig");

// ✅ Create Product
const create_Product = async (req, res) => {
  try {
    const {
      ProductName,
      Category,
      Subcategory,
      ProductDescription,
      Brand,
      Material,
      GSM_Thickness,
      Size,
      Type,
      JointType,
      FabricType,
      Eyelets,
      Lifespan,
      Color,
      SealingType,
      Accessories,
      KeyFeatures,
      Advantages,
      Application,
      image,
      subImages,
    } = req.body;

    // Validation
    if (!ProductName) return res.status(400).json({ msg: "Product name is required", status: false });
    if (!Category) return res.status(400).json({ msg: "Category is required", status: false });
    if (!Subcategory) return res.status(400).json({ msg: "Subcategory is required", status: false });

    const checkCategory = await CategoryModel.findById(Category);
    if (!checkCategory) return res.status(404).json({ msg: "Category not found", status: false });

    const checkSubCategory = await SubCategoryModel.findById(Subcategory);
    if (!checkSubCategory) return res.status(404).json({ msg: "Subcategory not found", status: false });

    const product = await ProductModel.create({
      ProductName,
      Category,
      Subcategory,
      ProductDescription,
      Brand,
      Material,
      GSM_Thickness,
      Size,
      Type,
      JointType,
      FabricType,
      Eyelets,
      Lifespan,
      Color,
      SealingType,
      Accessories,
      KeyFeatures,
      Advantages,
      Application,
      image: image || "", // ✅ Single image
      subImages: subImages || [], // ✅ Multiple sub-images
    });

    res.status(200).json({
      msg: "Product created successfully!",
      data: product,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ msg: `Error creating product: ${error.message}`, status: false });
  }
};

// ✅ Get All Products
const getAllProduct = async (req, res) => {
  try {
    const products = await ProductModel.find()
      .populate("Category", "name")
      .populate("Subcategory", "gsm_name");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: `Error fetching products: ${error.message}`, status: false });
  }
};

// ✅ Get Product By ID
const get_Product_by_Id = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id)
      .populate("Category", "name")
      .populate("Subcategory", "gsm_name");

    if (!product) return res.status(404).json({ msg: "Product not found", status: false });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: `Error fetching product: ${error.message}`, status: false });
  }
};

// ✅ Get Product By Category
const get_Product_By_Category = async (req, res) => {
  try {
    const products = await ProductModel.find({ Category: req.params.categoryId })
      .populate("Category", "name")
      .populate("Subcategory", "gsm_name");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: `Error fetching products by category: ${error.message}`, status: false });
  }
};

// ✅ Get Product By Subcategory
const get_Product_By_SubCategory = async (req, res) => {
  try {
    const products = await ProductModel.find({ Subcategory: req.params.subcategoryId })
      .populate("Category", "name")
      .populate("Subcategory", "gsm_name");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: `Error fetching products by subcategory: ${error.message}`, status: false });
  }
};

// ✅ Update Product (Edit + Update Image/Sub-Images)
const update_Product = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedProduct) return res.status(404).json({ msg: "Product not found", status: false });

    res.status(200).json({
      msg: "Product updated successfully",
      data: updatedProduct,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ msg: `Error updating product: ${error.message}`, status: false });
  }
};

// ✅ Delete Product
const delete_Product = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found", status: false });

    res.status(200).json({ msg: "Product deleted successfully", status: true });
  } catch (error) {
    res.status(500).json({ msg: `Error deleting product: ${error.message}`, status: false });
  }
};

// ✅ Upload Image or Sub-Images
const uploadFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ msg: "No files uploaded", status: false });

    const uploadedUrls = [];

    for (const file of req.files) {
      const uploadedUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "Megatex/Products" }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          })
          .end(file.buffer);
      });
      uploadedUrls.push(uploadedUrl);
    }

    res.status(200).json({
      msg: "File(s) uploaded successfully",
      paths: uploadedUrls,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ msg: `Error uploading files: ${error.message}`, status: false });
  }
};

module.exports = {
  create_Product,
  getAllProduct,
  get_Product_by_Id,
  get_Product_By_Category,
  get_Product_By_SubCategory,
  update_Product,
  delete_Product,
  uploadFiles,
};
