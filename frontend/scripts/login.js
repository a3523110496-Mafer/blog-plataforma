const API = "https://blog-plataforma.onrender.com";

// 👇 ESCUCHAR EL FORM
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // 🚨 evita que se recargue

    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        console.log("RESPUESTA:", data);

        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            window.location.href = "dashboard.html";
        } else {
            document.getElementById("errorMessage").textContent = "Credenciales incorrectas";
        }
    })
    .catch(err => {
        console.error("Error:", err);
    });
});