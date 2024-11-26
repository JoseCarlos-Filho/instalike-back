// Importar a biblioteca para interagir com a API da Google Generative AI
import { GoogleGenerativeAI } from "@google/generative-ai";

// Criar uma nova instância da classe GoogleGenerativeAI e especificar a chave da API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Selecionar o modelo Gemini 1.5 Flash para gerar o texto
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função assíncrona para gerar uma descrição da imagem usando o modelo Gemini
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Criar um prompt simples para o modelo
  const prompt = "Gere uma descrição em português do brasil para a seguinte imagem";

  try {
    // Converter a imagem em um formato que o modelo possa entender
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };

    // Enviar o prompt e a imagem para o modelo e aguardar a resposta
    const res = await model.generateContent([prompt, image]);

    // Extrair o texto gerado pela resposta e retornar
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    // Registrar o erro no console e lançar uma nova exceção
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}