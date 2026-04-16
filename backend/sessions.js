const sessions = {};

function createSession(username, token, role) {
    sessions[token] = { username, role };
}

function validateSession(token) {
    return sessions[token];
}

function invalidateSession(token) {
    delete sessions[token];
}

module.exports = {
    createSession,
    validateSession,
    invalidateSession
};
function protectPage() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("No autorizado");
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}