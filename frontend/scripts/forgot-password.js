const API = "https://blog-plataforma.onrender.com";

function requestReset() {
    const email = document.getElementById("email").value;

    fetch(`${API}/api/recovery/request-reset`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email })
    })
    .then(res => res.json())
    .then(data => {
        alert("Revisa consola para el token (simulado)");
    });
}