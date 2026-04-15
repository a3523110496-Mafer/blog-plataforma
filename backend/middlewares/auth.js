const sessionManager = require("../sessions");

function authMiddleware(req, res, next) {

    const token = req.headers.authorization;

    if (!token || !sessionManager.validateSession(token)) {
        return res.status(401).json({
            error: "No autorizado"
        });
    }

    req.user = sessionManager.getSession(token);

    next();
}

module.exports = authMiddleware;