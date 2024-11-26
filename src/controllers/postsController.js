import fs from "fs";
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiServices.js";

export async function listarPosts (req, res) {
    // Chama a função para obter os posts do banco de dados
    const resultadoPosts = await getTodosPosts();
    // Envia os posts como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(resultadoPosts);
};

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro" : "Falha na requisição"});
    }
};

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgURL: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.jpg`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro" : "Falha na requisição"});
    }
};

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.jpg`;
    
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.jpg`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgURL: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro" : "Falha na requisição"});
    }
};

