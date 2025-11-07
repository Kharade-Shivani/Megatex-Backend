const AdminModel = require("../Models/AdminModel");

// 🟢 Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required", status: false });
    }

    // Find admin by email
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({ msg: "Admin not found", status: false });
    }

    // Simple password check (plain text for now)
    if (admin.password !== password) {
      return res.status(401).json({ msg: "Invalid password", status: false });
    }

    res.status(200).json({
      msg: "Admin login successful",
      status: true,
      data: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: `Error logging in: ${error.message}`, status: false });
  }
};

// 🟢 Create Admin (use only once to add admin user)
const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await AdminModel.findOne({ email });

    if (existing) {
      return res.status(400).json({ msg: "Admin already exists", status: false });
    }

    const admin = await AdminModel.create({ email, password });

    res.status(200).json({
      msg: "Admin created successfully",
      data: admin,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ msg: `Error creating admin: ${error.message}`, status: false });
  }
};

module.exports = { adminLogin, createAdmin };
