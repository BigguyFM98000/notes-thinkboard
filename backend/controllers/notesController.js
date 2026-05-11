import Note from "../models/noteModel.js";

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getNotes controller: "+error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }

        res.status(200).json({message: "Note retrieved successfully", data: note});
    } catch (error) {
        console.error("Error in getNoteById controller: "+error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const createNote = async (req, res) => {
   try {
        const {title, content} = req.body;
        if(!title || !content) {
            return res.status(400).json({message: "Please provide the title and content"});
        }
        const newNote = new Note({title, content});
        const note = await newNote.save();

        res.status(201).json({message: "Note created successfully", data: note});
   } catch (error) {
        console.error("Error in createNote controller: "+error);
        res.status(500).json({message: "Internal server error"});     
   }
}

export const editNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        if(!title || !content){
            return res.status(400).json({message: "Please pass information to be updated"});
        }

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {returnDocument: 'after'});
        if(!updatedNote) {
            return res.status(404).json({message: "Note not found"});
        }

        res.status(200).json({message: "Note updated successfully", data: updatedNote});
    } catch (error) {
        console.error("Error in editNote controller: "+error);
        res.status(500).json({message: "Internal server error"}); 
    }
}

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note deleted successfully", data: deletedNote});
    } catch (error) {
        console.error("Error in deleteNote controller: "+error);
        res.status(500).json({message: "Internal server error"});
    }
}