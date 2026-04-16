const express = require("express");
const cors = require("cors");

const sessionManager = require("./sessions");
const recoveryRoutes = require("./routes/recovery");
const postsRoutes = require("./routes/posts");

const auth = require("./middlewares/auth");
const authorizeRole = require("./middlewares/roles");

const app = express();

app.use(cors());
app.use(express.json());

// RUTAS
app.use("/api/recovery", recoveryRoutes);
app.use("/api/posts", postsRoutes);

// LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        const token = Math.random().toString(36);

        sessionManager.createSession(username, token, "admin");

        return res.json({ token, role: "admin" });
    }

    if (username === "user" && password === "1234") {
        const token = Math.random().toString(36);

        sessionManager.createSession(username, token, "user");

        return res.json({ token, role: "user" });
    }

    res.status(401).json({ error: "Credenciales incorrectas" });
});

// DASHBOARD PROTEGIDO
app.get("/dashboard", auth, (req, res) => {
    res.json({ message: "Acceso permitido" });
});

// ADMIN
app.get("/admin", auth, authorizeRole("admin"), (req, res) => {
    res.json({ message: "Bienvenido admin" });
});

// USER
app.get("/user", auth, authorizeRole("user"), (req, res) => {
    res.json({ message: "Bienvenido usuario" });
});

// LOGOUT
app.post("/logout", (req, res) => {
    const token = req.headers.authorization;
    sessionManager.invalidateSession(token);
    res.json({ message: "Sesión cerrada" });
});

// ROOT (IMPORTANTE)
app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

let posts = [];

// OBTENER POSTS
app.get("/api/posts", (req, res) => {
    res.json(posts);
});

// CREAR POST (SOLO ADMIN)
app.post("/api/posts", (req, res) => {

    const token = req.headers.authorization;

    if (!sessionManager.validateSession(token)) {
        return res.status(401).json({ error: "No autorizado" });
    }

    const session = sessionManager.getSession(token);

    if (session.role !== "admin") {
        return res.status(403).json({ error: "Solo admin puede crear posts" });
    }

    const { title, content } = req.body;

    const newPost = {
        id: posts.length + 1,
        title,
        content
    };

    posts.push(newPost);

    res.json(newPost);
});