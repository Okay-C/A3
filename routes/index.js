const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment'); // Import Assignment model

// Home Page
router.get('/', async (req, res) => {
    try {
      const assignments = await Assignment.find(); // Display assignments on the home page
      res.render('index', { assignments }); // Pass the data to the index.ejs
    } catch (err) {
      console.error("Error fetching assignments:", err);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
