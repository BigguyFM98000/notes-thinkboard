import express from "express";
import cors from "cors";
import {config} from "dotenv";
import path from "path";

import connectDB from "./config/database.js";
import { connect } from "mongoose";
import notesRouter from "./routes/notesRoutes.js";
import rateLimiter from "./middlewares/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5050;
const __dirname = path.resolve();
config();

// Middlewares
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}

app.use(express.json());
app.use(rateLimiter);

app.get("/", (req, res) => {
    res.send("Welcome to my Notes-Thinkboard API");
});

app.use("/api/notes", notesRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/*splat", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, async () => {
        console.log(`Server listening at http://localhost:${PORT}`);
    });
});
