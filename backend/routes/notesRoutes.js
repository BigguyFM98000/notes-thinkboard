import express from "express";
const notesRouter = express.Router();
import { createNote, deleteNote, editNote, getNoteById, getNotes } from "../controllers/notesController.js";

notesRouter.get("/", getNotes);
notesRouter.get("/:id", getNoteById);
notesRouter.post("/", createNote);
notesRouter.put("/:id", editNote);
notesRouter.delete("/:id", deleteNote);

export default notesRouter;