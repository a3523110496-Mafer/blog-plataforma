const express = require("express");
const crypto = require("crypto");

const router = express.Router();

const recoveryTokens = {};

router.post("/request-reset", (req, res) => {

    const { email } = req.body;

    const token = crypto.randomBytes(32).toString("hex");

    const expiration = Date.now() + 1000 * 60 * 30;

    recoveryTokens[token] = {
        email,
        expiration
    };

    console.log("Token generado:", token);

    res.json({
        message: "Si el correo existe, recibirás instrucciones para recuperar tu contraseña."
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

    console.log("Contraseña actualizada para:", data.email);

    delete recoveryTokens[token];

    res.json({
        message: "Contraseña actualizada correctamente"
    });

});

module.exports = router;