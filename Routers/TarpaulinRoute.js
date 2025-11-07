const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const tarpaulinController = require("../Controllers/TarpaulinController");

// 🟢 CRUD Routes
router.post(
  "/create_Tarpaulin",
  upload.single("tarpaulin_image"),
  tarpaulinController.create_Tarpaulin
);
router.get("/getAllTarpaulin", tarpaulinController.getAllTarpaulin);
router.get("/get_Tarpaulin_By_Id/:id", tarpaulinController.get_Tarpaulin_By_Id);
router.put(
  "/update_Tarpaulin",
  upload.single("tarpaulin_image"),
  tarpaulinController.update_Tarpaulin
);
router.delete("/delete_Tarpaulin/:id", tarpaulinController.delete_Tarpaulin);

// 🟢 Cloudinary File Upload
router.post(
  "/file_upload_Tarpaulin",
  upload.single("tarpaulin_image"),
  tarpaulinController.fileupload
);

module.exports = router;
