const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: [true, "Product Name is required"],
      trim: true,
    },
    Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    Subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: [true, "Subcategory is required"],
    },

    ProductDescription: { type: String },
    Brand: { type: String },
    Material: { type: String },
    GSM_Thickness: { type: String },
    Size: { type: String },
    Type: { type: String },
    JointType: { type: String },
    FabricType: { type: String },
    Eyelets: { type: String },
    Lifespan: { type: String },
    Color: { type: String },
    SealingType: { type: String },
    Accessories: { type: String },
    KeyFeatures: { type: String },
    Advantages: { type: String },
    Application: { type: String },

    // ✅ Single main image
    image: { type: String, default: "" },

    // ✅ Multiple sub-images still allowed
    subImages: [{ type: String }],

    OriginOfCountry: {
      type: String,
      default: "India",
    },
    MfgBy: {
      type: String,
      default: "Megatex Industries",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
