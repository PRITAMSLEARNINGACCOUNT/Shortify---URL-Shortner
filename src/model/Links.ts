import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    OriginalUrl: {
      type: String,
      required: true,
    },
    ShortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    Clicks: {
      type: Number,
      default: 0,
    },
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Links || mongoose.model("Links", LinkSchema);
