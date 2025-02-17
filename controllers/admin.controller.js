import User from "../models/User.model.js";
import { createError } from "../utils/error.js";
import { generateToken } from "../utils/token.js";
import Lead from "../models/Lead.model.js";

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    const admin = await User.findOne({ email, role: "admin" }).select(
      "+password"
    );
    if (!admin) {
      console.log("Admin not found with email:", email);
      return next(createError(404, "Admin not found"));
    }

    console.log("Admin found, comparing password...");
    const isPasswordCorrect = await admin.comparePassword(password);
    console.log("Password comparison result:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return next(createError(400, "Invalid credentials"));
    }

    const token = generateToken(admin._id);

    // Send both token and admin details in response
    res.status(200).json({
      success: true,
      token, // Add token here
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalLeads = await Lead.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalLeads,
      },
    });
  } catch (error) {
    next(error);
  }
};
