const sessionManager = require("../sessions");

function authorizeRole(role) {
    return (req, res, next) => {
        const token = req.headers.authorization;

        const session = sessionManager.getSession(token);

        if (!session) {
            return res.status(401).json({
                error: "No autenticado"
            });
        }

        if (session.role !== role) {
            return res.status(403).json({
                error: "No autorizado"
            });
        }

        next();
    };
}

module.exports = authorizeRole;