const mongoose = require("mongoose");

const FIBCSchema = new mongoose.Schema(
  {
    fibc_image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU",
    },
    fibc_title: {
      type: String,
      required: [true, "FIBC Title is required"],
      trim: true,
    },
    fibc_specification: {
      type: String,
      required: [true, "FIBC Specification is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FIBC", FIBCSchema);
