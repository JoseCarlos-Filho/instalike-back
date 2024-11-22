import express from "express";
import { listarPosts, postarNovoPost } from "../controllers/postsController.js";

const routes = (app) => {
    // Permite que o Express entenda requisições com formato JSON
    app.use(express.json());

    // Rota GET para obter todos os posts
    app.get("/posts", listarPosts);
    // Rota para criar um post
    app.post("/posts", postarNovoPost);
}

export default routes;



