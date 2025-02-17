import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
    },
    service: {
      type: String,
      required: [true, "Please select a service"],
      enum: [
        "enterprise",
        "ecommerce",
        "web",
        "logo",
        "social",
        "marketing",
        "mobile",
        "blockchain",
        "health",
        "crm",
      ],
    },
    message: {
      type: String,
      required: [true, "Please provide a message"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Lead", leadSchema);
