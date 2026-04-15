const sessions = {};

function createSession(username, token, role) {
    sessions[token] = {
        username,
        role,
        createdAt: Date.now()
    };
}

function validateSession(token) {
    return sessions[token];
}

function getSession(token) {
    return sessions[token];
}

function invalidateSession(token) {
    delete sessions[token];
}

module.exports = {
    createSession,
    validateSession,
    getSession,
    invalidateSession
};