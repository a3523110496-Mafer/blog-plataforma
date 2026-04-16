const express = require("express");
const crypto = require("crypto");

const router = express.Router();
const recoveryTokens = {};

router.post("/request-reset", (req, res) => {
    const { email } = req.body;

    const token = crypto.randomBytes(32).toString("hex");
    const expiration = Date.now() + 1000 * 60 * 30;

    recoveryTokens[token] = { email, expiration };

    console.log("Token:", token);

    res.json({
        message: "Revisa tu correo (simulado)"
    });
});

router.post("/reset-password", (req, res) => {
    const { token, newPassword } = req.body;

    const data = recoveryTokens[token];

    if (!data) {
        return res.status(400).json({ error: "Token inválido" });
    }

    if (Date.now() > data.expiration) {
        delete recoveryTokens[token];
        return res.status(400).json({ error: "Token expirado" });
    }

    console.log("Password actualizada para:", data.email);

    delete recoveryTokens[token];

    res.json({ message: "Contraseña actualizada" });
});

module.exports = router;