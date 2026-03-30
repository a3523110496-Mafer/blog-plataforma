const form = document.getElementById("resetForm");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const token = document.getElementById("token").value;
const password = document.getElementById("password").value;

const response = await fetch("http://localhost:3000/api/recovery/reset-password", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
token,
newPassword: password
})

});

const data = await response.json();

document.getElementById("result").textContent = data.message || data.error;

});