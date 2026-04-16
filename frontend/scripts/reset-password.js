const API = "https://blog-plataforma.onrender.com";

function resetPassword() {
    const token = document.getElementById("token").value;
    const newPassword = document.getElementById("password").value;

    fetch(`${API}/api/recovery/reset-password`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ token, newPassword })
    })
    .then(res => res.json())
    .then(data => {
        alert("Contraseña actualizada");
        window.location.href = "login.html";
    });
}