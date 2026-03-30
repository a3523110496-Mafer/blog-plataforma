const sessions = {};

function createSession(userId, token) {

if (!sessions[userId]) {
sessions[userId] = [];
}

sessions[userId].push({
token: token,
createdAt: Date.now()
});

}

function validateSession(token) {

for (const userId in sessions) {

const session = sessions[userId].find(s => s.token === token);

if (session) {
return true;
}

}

return false;

}

function invalidateSession(token) {

for (const userId in sessions) {

sessions[userId] = sessions[userId].filter(s => s.token !== token);

}

}

function getSessions(userId){
return sessions[userId] || [];
}

module.exports = {
createSession,
validateSession,
invalidateSession,
getSessions
};