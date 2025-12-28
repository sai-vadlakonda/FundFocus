const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* 🔑 Generate Parent Code */
const generateParentCode = () => {
    return "FF-" + Math.random().toString(36).substring(2, 6).toUpperCase();
};

/* =========================
   REGISTER (PARENT / CHILD)
   ========================= */
router.post("/register", async (req, res) => {
    try {
        const { username, password, role, parentCode } = req.body;

        // 1️⃣ Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2️⃣ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3️⃣ Prepare base user data
        let userData = {
            username,
            password: hashedPassword,
            role,
        };

        /* 👨‍👩‍👧 PARENT REGISTRATION */
        if (role === "parent") {
            userData.parentCode = generateParentCode();
        }

        /* 👶 CHILD REGISTRATION */
        if (role === "child") {
            if (!parentCode) {
                return res
                    .status(400)
                    .json({ message: "Parent code is required for child" });
            }

            const parent = await User.findOne({
                parentCode,
                role: "parent",
            });

            if (!parent) {
                return res.status(400).json({ message: "Invalid parent code" });
            }

            userData.linkedParent = parent._id;
        }

        // 4️⃣ Create user
        const newUser = await User.create(userData);

        // 5️⃣ Respond
        res.status(201).json({
            message: "Registration successful",
            parentCode: newUser.parentCode || null, // only parents receive this
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

/* =========
   LOGIN
   ========= */
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            role: user.role,
            username: user.username,
            userId: user._id, // 🔥 THIS WAS MISSING
        });


    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/* =========================
   GET CHILDREN (PARENT)
   ========================= */
router.get("/children/:parentId", async (req, res) => {
    try {
        const children = await User.find({
            linkedParent: req.params.parentId,
        }).select("-password");

        res.json(children);
    } catch (error) {
        res.status(500).json({ message: "Error fetching children" });
    }
});

module.exports = router;
