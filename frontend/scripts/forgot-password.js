document.getElementById("forgotForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;

    const res = await fetch("http://localhost:3000/api/recovery/request-reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });

    const data = await res.json();

    document.getElementById("message").innerText = data.message;

    alert("Revisa la consola del backend para ver el token 👀");
});