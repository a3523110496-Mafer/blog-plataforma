const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authorizeRole = require("../middlewares/roles");

let posts = [];

// VER POSTS (todos)
router.get("/", (req, res) => {
    res.json(posts);
});

// CREAR POST (solo admin)
router.post("/", auth, authorizeRole("admin"), (req, res) => {
    const { title, content } = req.body;

    const newPost = {
        id: Date.now(),
        title,
        content
    };

    posts.push(newPost);

    res.json(newPost);
});

module.exports = router;