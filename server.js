import express from "express"; // Importa o framework Express para criar a aplicação web
import conectarAoBanco from "./src/config/dbConfig.js"; // Importa a função para conectar ao banco de dados (definida em dbConfig.js)

// Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Array de posts de exemplo (será substituído pelos dados do banco de dados)
// const posts = [
//   // ... (objetos dos posts)
// ];

// Cria uma instância do Express
const app = express();
// Permite que o Express entenda requisições com formato JSON
app.use(express.json());

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("servidor escutando...");
});

// Função assíncrona para obter todos os posts do banco de dados
async function getTodosPosts() {
  // Seleciona o banco de dados "imersao-instabytes"
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Retorna todos os documentos da coleção como um array
  return colecao.find().toArray();
}

// Rota GET para obter todos os posts
app.get("/posts", async (req, res) => {
  // Chama a função para obter os posts do banco de dados
  const resultadoPosts = await getTodosPosts();
  // Envia os posts como resposta em formato JSON com status 200 (sucesso)
  res.status(200).json(posts);
});
// app.get("/posts", (req, res) => {
//     res.status(200).json(posts);
// });

// function buscarPostPorID(id) {
//     return posts.findIndex((post) => {
//         return post.id === Number(id)
//     });
// }

// app.get("/posts/:id", (req, res) => {
//     const index = buscarPostPorID(req.params.id);
//     res.status(200).json(posts[index]);
// });