const express = require('express');
const router = express.Router();
const notesController = require('../controller/note_controller');

// Create a new note
router.post('/', notesController.createNote);

// Read all notes
router.get('/', notesController.getNotes);

// Read note by ID
router.get('/:id', notesController.getNoteById);

// Update a note
router.put('/:id', notesController.updateNote);

// Delete a note
router.delete('/:id', notesController.deleteNote);

module.exports = router;
