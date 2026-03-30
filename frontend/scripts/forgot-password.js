const form = document.getElementById("recoveryForm");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("email").value;

const response = await fetch("http://localhost:3000/api/recovery/request-reset", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({ email })

});

const data = await response.json();

document.getElementById("message").textContent = data.message;

});