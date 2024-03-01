const Note = require('../model/note');
const { v4: uuidv4 } = require('uuid');

// Create a new note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      noteID: uuidv4(), // Implement this function to generate a unique ID
      syncStatus: 'Unsynced',
      version: 1,
      dateCreated: new Date(),
      dateModified: new Date(),
    });
    await note.save();
    res.status(201).json({ success: true, data: note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Read all notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isDeleted: false });
    res.status(200).json({ success: true, data: notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Read note by ID
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ noteID: req.params.id, isDeleted: false });
    if (!note) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    res.status(200).json({ success: true, data: note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    let note = await Note.findOne({ noteID: req.params.id, isDeleted: false });
    if (!note) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    note.title = title;
    note.content = content;
    note.dateModified = new Date();
    note.version += 1;
    note.syncStatus = 'Unsynced';
    await note.save();
    res.status(200).json({ success: true, data: note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    let note = await Note.findOne({ noteID: req.params.id, isDeleted: false });
    if (!note) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    note.isDeleted = true;
    note.syncStatus = 'Unsynced';
    await note.save();
    res.status(200).json({ success: true, data: note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
