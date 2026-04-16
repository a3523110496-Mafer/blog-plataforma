const sessionManager = require("../sessions");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "No token" });
    }

    const session = sessionManager.validateSession(token);

    if (!session) {
        return res.status(401).json({ error: "Sesión inválida" });
    }

    req.user = session;
    next();
};