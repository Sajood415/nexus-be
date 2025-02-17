import Lead from "../models/Lead.model.js";

export const createLead = async (req, res, next) => {
  try {
    const { name, email, service, message } = req.body;

    const lead = await Lead.create({
      name,
      email,
      service,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Thank you for your interest! Our team will contact you soon.",
      lead,
    });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find().sort("-createdAt");

    res.status(200).json({
      success: true,
      leads,
    });
  } catch (error) {
    next(error);
  }
};
