const mongoose = require("mongoose");

/* =========================
   🔹 HISTORY SCHEMA
   ========================= */
const historySchema = new mongoose.Schema({
  type: {
    type: String, // "earn" | "spend"
    enum: ["earn", "spend"],
    required: true,
  },

  source: {
    type: String, // Reading, YouTube, Exercise, etc.
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now, // 🔥 used for daily/monthly grouping
  },
});

/* =========================
   🔹 USER SCHEMA
   ========================= */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["parent", "child"],
    required: true,
  },

  /* 👨‍👩‍👧 PARENT → CHILD LINK */
  parentCode: {
    type: String,
    unique: true,
    sparse: true,
  },

  linkedParent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  /* 📜 HISTORY (SINGLE SOURCE OF TRUTH) */
  history: [historySchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  /* 🔒 PARENT CONTROL RULES */
  limits: {
    dailySpendLimit: {
      type: Number,
      default: null,
    },

    appLimits: {
      type: Map,
      of: Number, // appName → max tokens per day
    },
  },
});

module.exports = mongoose.model("User", userSchema);
