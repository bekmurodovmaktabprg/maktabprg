const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');

// Create a new setting
router.post('/', async (req, res) => {
  try {
    const newSetting = new Setting(req.body);
    await newSetting.save();
    res.status(201).json(newSetting);
  } catch (error) {
    res.status(500).json({ message: 'Error creating setting', error });
  }
});

// Get all settings
router.get('/', async (req, res) => {
  try {
    const settings = await Setting.find();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error });
  }
});

// Update a setting by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSetting = await Setting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSetting);
  } catch (error) {
    res.status(500).json({ message: 'Error updating setting', error });
  }
});

// Delete a setting by ID
router.delete('/:id', async (req, res) => {
  try {
    await Setting.findByIdAndDelete(req.params.id);
    res.json({ message: 'Setting deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting setting', error });
  }
});

module.exports = router;
