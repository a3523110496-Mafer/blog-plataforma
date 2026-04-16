const API = "";

function login(event) {

    event.preventDefault();

    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {

        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            window.location.href = "dashboard.html";
        } else {
            alert("Error al iniciar sesión");
        }

    });
}

/* ACTIVAR FORM */
document.getElementById("loginForm").addEventListener("submit", login);