import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "The title is required"],
        trim: true,
        minLength: 2,
        maxLength: 50
    }, 
    content: {
        type: String,
        required: [true, "The content is required"],
        trim: true,
        minLength: 2,
        maxLength: 100
    }
}, {timestamps: true});

const Note = mongoose.model("Note", noteSchema);

export default Note;