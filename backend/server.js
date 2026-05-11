import express from "express";
import {config} from "dotenv";
import connectDB from "./config/database.js";
import { connect } from "mongoose";
import notesRouter from "./routes/notesRoutes.js";
import rateLimiter from "./middlewares/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5050;
config();

// Middlewares
app.use(express.json());
app.use(rateLimiter);

app.get("/", (req, res) => {
    console.log(`Welcome to my Notes-Thinkboard Api`);
});

app.use("/api/notes", notesRouter);

connectDB().then(() => {
    app.listen(PORT, async () => {
        console.log(`Server listening at http://localhost:${PORT}`);
    });
});
