const express = require("express");
const router = express.Router();
const subCategoryController = require("../Controllers/SubCategoryControllers");

router.post("/create_subcategory", subCategoryController.create_SubCategory);
router.get("/getAllSubCategory", subCategoryController.getAllSubCategory);
router.get("/get_SubCategory_by_Id/:id", subCategoryController.get_SubCategory_by_Id);
router.put("/update_SubCategory", subCategoryController.update_SubCategory);
router.delete("/delete_SubCategory/:id", subCategoryController.delete_SubCategory);

module.exports = router;
