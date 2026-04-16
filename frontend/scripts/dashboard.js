// CREAR POST
function createPost() {

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    fetch(`/api/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({ title, content })
    })
    .then(res => res.json())
    .then(() => {
        getPosts();
    });
}

// OBTENER POSTS
function getPosts() {

    fetch(`/api/posts`)
    .then(res => res.json())
    .then(data => {

        const container = document.getElementById("posts");
        container.innerHTML = "";

        data.forEach(post => {

            const div = document.createElement("div");

            div.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.content}</p>
                <hr>
            `;

            container.appendChild(div);
        });
    });
}