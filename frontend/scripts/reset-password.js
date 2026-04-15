document.getElementById("resetForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = document.getElementById("token").value;
    const newPassword = document.getElementById("newPassword").value;

    const res = await fetch("http://localhost:3000/api/recovery/reset-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token,
            newPassword
        })
    });

    const data = await res.json();

    document.getElementById("message").innerText = data.message || data.error;
});