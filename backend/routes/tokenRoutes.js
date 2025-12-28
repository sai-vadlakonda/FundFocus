const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const socket = require("../socket");

const router = express.Router();

/* =========================
   🔹 HELPERS
   ========================= */

const getStartOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const calculateLifetimeSummary = (history = []) => {
  let earned = 0;
  let spent = 0;

  history.forEach((h) => {
    if (h.type === "earn") earned += h.amount;
    if (h.type === "spend") spent += h.amount;
  });

  return {
    earned,
    spent,
    balance: earned - spent,
  };
};

const calculateTodaySummary = (history = []) => {
  const today = getStartOfToday();
  let earned = 0;
  let spent = 0;

  history.forEach((h) => {
    if (new Date(h.date) >= today) {
      if (h.type === "earn") earned += h.amount;
      if (h.type === "spend") spent += h.amount;
    }
  });

  return { earned, spent };
};

const calculateTodaySpent = (history = []) => {
  const today = getStartOfToday();
  return history
    .filter(
      (h) => h.type === "spend" && new Date(h.date) >= today
    )
    .reduce((s, h) => s + h.amount, 0);
};

/* =========================
   🔹 GET SUMMARY (FINAL SHAPE)
   ========================= */
router.get("/summary", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const lifetime = calculateLifetimeSummary(user.history);
    const today = calculateTodaySummary(user.history);

    res.json({
      today,          // 👶 child dashboard (today view)
      lifetime,       // 👨 parent dashboard (all-time)
      recent: user.history
        .slice(-10)
        .reverse(),
    });
  } catch (err) {
    console.error("SUMMARY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   🔹 EARN TOKENS
   ========================= */
router.post("/earn", auth, async (req, res) => {
  try {
    const { source, amount } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.history.push({
      type: "earn",
      source,
      amount,
      date: new Date(),
    });

    await user.save();

    const io = socket.getIO();

    // 🔥 UPDATE CHILD DASHBOARD
    io.to(user._id.toString()).emit("child-token-update");

    // 🔥 UPDATE PARENT DASHBOARD
    if (user.linkedParent) {
      io.to(user.linkedParent.toString()).emit("child-token-update");
    }

    res.json({ success: true });
  } catch (err) {
    console.error("EARN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   🔹 SPEND TOKENS
   ========================= */
router.post("/spend", auth, async (req, res) => {
  try {
    const { source, amount } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { balance } = calculateLifetimeSummary(user.history);
    if (balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const dailyLimit = user.limits?.dailySpendLimit;
    if (dailyLimit != null) {
      const spentToday = calculateTodaySpent(user.history);
      if (spentToday + amount > dailyLimit) {
        if (user.linkedParent) {
          socket.getIO().to(user.linkedParent.toString()).emit(
            "child-limit-hit",
            {
              child: user.username,
              dailyLimit,
            }
          );
        }
        return res
          .status(403)
          .json({ message: `Daily limit reached (${dailyLimit})` });
      }
    }

    user.history.push({
      type: "spend",
      source,
      amount,
      date: new Date(),
    });

    await user.save();

    const io = socket.getIO();

    // 🔥 UPDATE CHILD DASHBOARD
    io.to(user._id.toString()).emit("child-token-update");

    // 🔥 UPDATE PARENT DASHBOARD
    if (user.linkedParent) {
      io.to(user.linkedParent.toString()).emit("child-token-update");
    }

    res.json({ success: true });
  } catch (err) {
    console.error("SPEND ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
