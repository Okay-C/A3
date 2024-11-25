const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment'); // Import Assignment model

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find(); // Fetch all assignments from the database
    res.render('assignments/list', { assignments }); // Render the list page with data
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).send('Server Error');
  }
});

// Render form to create a new assignment
router.get('/new', (req, res) => {
  try {
    res.render('assignments/create'); // Render the create form
  } catch (error) {
    console.error('Error rendering the create page:', error);
    res.status(500).send('Server Error');
  }
});

// Create a new assignment (POST request)
router.post('/', async (req, res) => {
  try {
    await Assignment.create(req.body); // Create a new assignment in the database
    res.redirect('/assignments'); // Redirect to the list page after creation
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).send('Server Error');
  }
});

// Render form to edit an existing assignment
router.get('/:id/edit', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id); // Fetch the assignment by ID
    if (!assignment) {
      return res.status(404).send('Assignment not found');
    }
    res.render('assignments/edit', { assignment }); // Render the edit form with assignment data
  } catch (error) {
    console.error('Error fetching assignment for editing:', error);
    res.status(500).send('Server Error');
  }
});

// Update an existing assignment (PUT request)
router.put('/:id', async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, {
      title,
      description,
      dueDate,
      status
    });
    if (!updatedAssignment) {
      return res.status(404).send('Assignment not found');
    }
    res.redirect('/assignments'); // Redirect to the list page after updating
  } catch (error) {
    console.error('Error updating assignment:', error);
    res.status(500).send('Server Error');
  }
});

// Delete an assignment
router.delete('/:id', async (req, res) => {
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id); // Delete assignment by ID
    if (!deletedAssignment) {
      return res.status(404).send('Assignment not found');
    }
    res.redirect('/assignments'); // Redirect to the list page after deletion
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
