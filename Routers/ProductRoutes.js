const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const productController = require("../Controllers/ProductController");

// ✅ CRUD Routes
router.post("/create_product", productController.create_Product);
router.get("/getAllProduct", productController.getAllProduct);
router.get("/get_Product_by_Id/:id", productController.get_Product_by_Id);
router.get("/get_Product_By_Category/:categoryId", productController.get_Product_By_Category);
router.get("/get_Product_By_SubCategory/:subcategoryId", productController.get_Product_By_SubCategory);
router.put("/update_Product", productController.update_Product);
router.delete("/delete_Product/:id", productController.delete_Product);

// ✅ Upload Route (image + subImages)
router.post("/product_file_upload", upload.array("files", 10), productController.uploadFiles);

module.exports = router;
