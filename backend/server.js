const express = require("express");
const cors = require("cors");

const sessionManager = require("./sessions");
const recoveryRoutes = require("./routes/recovery");

const app = express();

app.use(cors());
app.use(express.json());

/* ACTIVAR RUTAS DE RECUPERACIÓN */

app.use("/api/recovery", recoveryRoutes);

const PORT = 3000;

/* LOGIN */

app.post("/login", (req, res) => {

const { username, password } = req.body;

if (username === "admin" && password === "1234") {

const token = Math.random().toString(36);

sessionManager.createSession(username, token);

res.json({
token: token,
role: "admin"
});

} else {

res.status(401).json({
error: "Credenciales incorrectas"
});

}

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