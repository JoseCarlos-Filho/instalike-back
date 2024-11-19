import express from "express";

const app = express();
// servidore escutando na porta 3000
app.listen(3000, () => {
    console.log("servidor escutando...");
});

//  pegando algum recurso do servidor.
app.get("/api", (req, res) => {
    res.status(200).send("Boas vindas à imersão!");
});