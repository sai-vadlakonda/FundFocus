const express = require("express");
const User = require("../models/User");

const router = express.Router();

/* =========================
   EARN TOKENS (CHILD)
   ========================= */
router.post("/earn", async (req, res) => {
  const { childId, amount } = req.body;

  try {
    const child = await User.findById(childId);
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    child.tokens += amount;
    child.dailyEarned += amount;

    await child.save();

    res.json({
      tokens: child.tokens,
      earned: child.dailyEarned,
      spent: child.dailySpent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error earning tokens" });
  }
});

/* =========================
   SPEND TOKENS (CHILD)
   ========================= */
router.post("/spend", async (req, res) => {
  const { childId, amount } = req.body;

  try {
    const child = await User.findById(childId);
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    if (child.tokens < amount) {
      return res.status(400).json({ message: "Not enough tokens" });
    }

    child.tokens -= amount;
    child.dailySpent += amount;

    await child.save();

    res.json({
      tokens: child.tokens,
      earned: child.dailyEarned,
      spent: child.dailySpent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error spending tokens" });
  }
});

/* =========================
   GET CHILD ANALYTICS
   ========================= */
router.get("/analytics/:childId", async (req, res) => {
  try {
    const child = await User.findById(req.params.childId).select(
      "username tokens dailyEarned dailySpent"
    );

    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    res.json({
      username: child.username,
      tokens: child.tokens,
      earned: child.dailyEarned,
      spent: child.dailySpent,
      net: child.dailyEarned - child.dailySpent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics" });
  }
});

module.exports = router;
