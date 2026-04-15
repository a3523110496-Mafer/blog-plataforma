const express = require("express");
const cors = require("cors");

const sessionManager = require("./sessions");
const recoveryRoutes = require("./routes/recovery");

const authMiddleware = require("./middlewares/auth");
const roleMiddleware = require("./middlewares/roles");

const authorizeRole = require("./middlewares/roles");

const app = express();

app.use(cors());
app.use(express.json());

/* ACTIVAR RUTAS DE RECUPERACIÓN */

app.use("/api/recovery", recoveryRoutes);

const PORT = 3000;

/* LOGIN */

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

/* DASHBOARD PROTEGIDO */

app.get("/dashboard", (req, res) => {

const token = req.headers.authorization;

if (!sessionManager.validateSession(token)) {

return res.status(401).json({
error: "Sesión inválida"
});

}

res.json({
message: "Acceso permitido"
});

});

/* LOGOUT */

app.post("/logout", (req, res) => {

const token = req.headers.authorization;

sessionManager.invalidateSession(token);

res.json({
message: "Sesión cerrada"
});

});

app.listen(PORT, () => {

console.log("Servidor corriendo en http://localhost:3000");

});

//RUTAS SOLO PARA ADMIN
app.get("/admin", authorizeRole("admin"), (req, res) => {
    res.json({
        message: "Bienvenido admin"
    });
});

//RUTA PROTEGIDA GENERAL
app.get("/user", authorizeRole("user"), (req, res) => {
    res.json({
        message: "Bienvenido usuario"
    });
});