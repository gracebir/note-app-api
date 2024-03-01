const mongoose = require('../lib/db');
const { Schema } = mongoose;

const noteSchema = new Schema({
  noteID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
  syncStatus: { type: String, enum: ['Unsynced', 'Synced', 'Conflict'], default: 'Unsynced' },
  version: { type: Number, default: 1 },
  isDeleted: { type: Boolean, default: false },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;