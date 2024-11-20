import express from "express";

const posts = [
    {
      id: 1,
      descricao: "Uma foto teste",
      imagem: "https://placecats.com/millie/300/150"
    },
    {
      id: 2,
      descricao: "Gato preguiçoso",
      imagem: "https://placekitten.com/200/300"
    },
    {
      id: 3,
      descricao: "Gatinho curioso",
      imagem: "https://placekitten.com/g/300/200"
    },
    {
      id: 4,
      descricao: "Gatos brincando",
      imagem: "https://placekitten.com/400/300"
    },
    {
      id: 5,
      descricao: "Gatinho dormindo",
      imagem: "https://placekitten.com/300/200"
    },
    {
      id: 6,
      descricao: "Gato com bola de lã",
      imagem: "https://placekitten.com/200/200"
    }
  ];

const app = express();
app.use(express.json());
// servidore escutando na porta 3000
app.listen(3000, () => {
    console.log("servidor escutando...");
});

//  pegando algum recurso do servidor.
app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function buscarPostPorID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id)
    });
}

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id);
    res.status(200).json(posts[index]);
});