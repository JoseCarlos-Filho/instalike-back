import express from "express"; // Importa o framework Express para criar a aplicação web
import routes from "./src/routes/postsRoutes.js";


// Array de posts de exemplo (será substituído pelos dados do banco de dados)
// const posts = [
//   // ... (objetos dos posts)
// ];

// Cria uma instância do Express
const app = express();
app.use(express.static("uploads"));
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("servidor escutando...");
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