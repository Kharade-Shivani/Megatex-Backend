const mongoose = require("mongoose");

const TarpaulinSchema = new mongoose.Schema(
  {
    tarpaulin_image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU",
    },
    tarpaulin_title: {
      type: String,
      required: [true, "Tarpaulin Title is required"],
      trim: true,
    },
    tarpaulin_description: {
      type: String,
      required: [true, "Tarpaulin Description is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tarpaulin", TarpaulinSchema);
