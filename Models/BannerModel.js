const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String, 
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU'
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
);

module.exports = mongoose.model("Banner", bannerSchema);