const API = "https://blog-plataforma.onrender.com";

function saveSession(token) {
    localStorage.setItem("token", token);
}

function getToken() {
    return localStorage.getItem("token");
}

function logout() {
    fetch(`${API}/logout`, {
        method: "POST",
        headers: {
            "Authorization": getToken()
        }
    });

    localStorage.removeItem("token");
    window.location.href = "login.html";
}

function protectPage() {
    const token = getToken();

    if (!token) {
        window.location.href = "login.html";
    }
}