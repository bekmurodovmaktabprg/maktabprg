const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', multer().single('profileImage'), async (req, res) => {
    const { firstName, lastName, region, district, school, role, phone, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            region,
            district,
            school,
            role,
            phone,
            password: hashedPassword,
            profileImage: req.file ? req.file.path : null,
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Error registering user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { phone, password } = req.body;

    try {
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ error: 'Invalid phone or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid phone or password' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
        res.json({ token, userId: user._id });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
