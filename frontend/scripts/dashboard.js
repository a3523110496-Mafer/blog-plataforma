const API = "https://blog-plataforma.onrender.com";

// CREAR POST
function createPost() {

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Completa todos los campos");
        return;
    }

    fetch(`${API}/api/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({ title, content })
    })
    .then(res => res.json())
    .then(data => {
        console.log("POST:", data);

        document.getElementById("title").value = "";
        document.getElementById("content").value = "";

        getPosts();
    })
    .catch(err => console.error("ERROR:", err));
}

// OBTENER POSTS
function getPosts() {

    fetch(`${API}/api/posts`)
    .then(res => res.json())
    .then(data => {

        const container = document.getElementById("posts");
        container.innerHTML = "";

        data.forEach(post => {

            const div = document.createElement("div");
            div.className = "post";

            div.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.content}</p>
            `;

            container.appendChild(div);
        });
    })
    .catch(err => console.error("ERROR:", err));
}