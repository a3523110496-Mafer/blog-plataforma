const express = require("express");
const cors = require("cors");

const sessionManager = require("./sessions");
const recoveryRoutes = require("./routes/recovery");

const authMiddleware = require("./middlewares/auth");
const authorizeRole = require("./middlewares/roles");

const app = express();

app.use(cors());
app.use(express.json());

/* ============================= */
/* RECOVERY PASSWORD */
/* ============================= */

app.use("/api/recovery", recoveryRoutes);

/* ============================= */
/* LOGIN */
/* ============================= */

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // ADMIN
    if (username === "admin" && password === "1234") {
        const token = Math.random().toString(36);

        sessionManager.createSession(username, token, "admin");

        return res.json({
            token,
            role: "admin"
        });
    }

    // USER
    if (username === "user" && password === "1234") {
        const token = Math.random().toString(36);

        sessionManager.createSession(username, token, "user");

        return res.json({
            token,
            role: "user"
        });
    }

    // ERROR
    res.status(401).json({
        error: "Credenciales incorrectas"
    });
});

/* ============================= */
/* DASHBOARD (PROTEGIDO) */
/* ============================= */

app.get("/dashboard", authMiddleware, (req, res) => {
    res.json({
        message: "Acceso permitido al dashboard"
    });
});

/* ============================= */
/* LOGOUT */
/* ============================= */

app.post("/logout", authMiddleware, (req, res) => {
    const token = req.headers.authorization;

    sessionManager.invalidateSession(token);

    res.json({
        message: "Sesión cerrada"
    });
});

/* ============================= */
/* RUTAS POR ROL */
/* ============================= */

// SOLO ADMIN
app.get("/admin", authMiddleware, authorizeRole("admin"), (req, res) => {
    res.json({
        message: "Bienvenido admin"
    });
});

// SOLO USER
app.get("/user", authMiddleware, authorizeRole("user"), (req, res) => {
    res.json({
        message: "Bienvenido usuario"
    });
});

/* ============================= */
/* RUTA RAÍZ (IMPORTANTE PARA RENDER) */
/* ============================= */

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

/* ============================= */
/* SERVIDOR */
/* ============================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});