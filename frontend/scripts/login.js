document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("input[type='text']").value;
    const password = document.querySelector("input[type='password']").value;

    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
        alert("Login exitoso");
    } else {
        alert(data.error);
    }

    if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    window.location.href = "../pages/dashboard.html";
}
});