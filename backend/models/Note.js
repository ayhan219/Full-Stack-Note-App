const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note",NoteSchema);

module.exports = Note;