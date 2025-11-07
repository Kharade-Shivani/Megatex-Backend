const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const categoryController = require("../Controllers/CategoryController");

// CRUD Routes
router.post("/create_category", categoryController.create_Category);
router.get("/getAllCategory", categoryController.getAllCategory);
router.get("/get_Category_by_Id/:id", categoryController.get_Category_by_Id);
router.put("/update_Category", categoryController.update_Category);
router.delete("/delete_Category/:id", categoryController.delete_Category);

// File Upload Route
router.post(
  "/category_file_upload",
  upload.single("image"),
  categoryController.fileupload
);

module.exports = router;
