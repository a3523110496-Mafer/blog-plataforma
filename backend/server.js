const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* ===== SERVIR FRONTEND ===== */
app.use(express.static(path.join(__dirname, "../frontend")));

/* ===== LOGIN ===== */
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        return res.json({
            token: "admin-token",
            role: "admin"
        });
    }

    if (username === "user" && password === "1234") {
        return res.json({
            token: "user-token",
            role: "user"
        });
    }

    res.status(401).json({ error: "Credenciales incorrectas" });
});

/* ===== POSTS (FAKE EN MEMORIA) ===== */
let posts = [];

/* CREAR POST */
app.post("/api/posts", (req, res) => {

    const token = req.headers.authorization;

    if (token !== "admin-token") {
        return res.status(403).json({ error: "No autorizado" });
    }

    const { title, content } = req.body;

    const newPost = { title, content };

    posts.push(newPost);

    res.json(newPost);
});

/* OBTENER POSTS */
app.get("/api/posts", (req, res) => {
    res.json(posts);
});

/* ===== RUTA PRINCIPAL ===== */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/login.html"));
});

/* ===== SERVIDOR ===== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});