import mongoose from "mongoose";

const FarmerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    farmerId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    village: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "farmers",
  }
);

const Farmer =
  mongoose.models.Farmer ||
  mongoose.model("Farmer", FarmerSchema);

export default Farmer;