const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const bannerController = require("../Controllers/BannerControllers");

// CRUD Routes
router.post("/create_banner", bannerController.create_Banner);
router.get("/getAllBanner", bannerController.getAllBanner);
router.get("/get_Banner_by_Id/:id", bannerController.get_Banner_by_Id);
router.put("/update_Banner", bannerController.update_Banner);
router.delete("/delete_Banner/:id", bannerController.delete_Banner);

// Image Upload Route - FIXED: Added bannerController prefix
router.post("/file_upload", upload.single("image"), bannerController.fileupload);

module.exports = router;