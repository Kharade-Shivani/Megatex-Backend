const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fibcController = require("../Controllers/FIBCController");

// 🟢 CRUD Routes
router.post("/create_FIBC", fibcController.create_FIBC);
router.get("/getAllFIBC", fibcController.getAllFIBC);
router.get("/get_FIBC_By_Id/:id", fibcController.get_FIBC_By_Id);
router.put("/update_FIBC", fibcController.update_FIBC);
router.delete("/delete_FIBC/:id", fibcController.delete_FIBC);

// 🟢 Cloudinary File Upload (like banner master)
router.post(
  "/file_upload_FIBC",
  upload.single("fibc_image"),
  fibcController.fileupload
);

module.exports = router;
