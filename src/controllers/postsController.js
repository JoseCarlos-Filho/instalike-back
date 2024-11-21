import getTodosPosts from "../models/postsModel.js";

export async function listarPosts (req, res) {
    // Chama a função para obter os posts do banco de dados
    const resultadoPosts = await getTodosPosts();
    // Envia os posts como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(resultadoPosts);
}

