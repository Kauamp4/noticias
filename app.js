const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer"); //biblioteca para Node.js que permite enviar emails de forma fácil e segura

dotenv.config();
const app = express();
app.use(express.json());

// Lista de usuários cadastrados (apenas para exemplo)
const usuarios = [];

app.get("/", (req, res) => {
    res.status(200).send("Bem vindo a nossa API de Envio de E-mail!!!"); // Rota raiz que retorna uma mensagem de boas-vindas
});

// Rota para registrar usuário e enviar e-mail de boas-vindas
app.post("/registrar", async (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ msg: "Nome e e-mail são obrigatórios." });
    }
    if (usuarios.find((u) => u.email === email)) {
        return res.status(400).json({ msg: "E-mail já cadastrado." });
    }
    usuarios.push({ nome, email });

    // Envia o e-mail de boas-vindas
    try {
        const transportador = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        await transportador.sendMail({//função de envio de e-mail, após realizar o cadastro
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: email,
            subject: "Bem-vindo!",
            text: `Olá ${nome}, obrigado por se registrar!!!!!!`,
            html: `<h2>Olá ${nome},</h2><p>Obrigado por se registrar!!!!!!</p>`,
        });
    } catch (erro) {
        console.error("Erro ao enviar e-mail de boas-vindas:", erro.message);
    }

    res.status(201).json({ msg: "Usuário registrado e e-mail enviado!" });
});

// Rota para enviar e-mail manualmente
app.post("/enviar-email", async (req, res) => {
    const { para, assunto, texto, html } = req.body;
    if (!para || !assunto || (!texto && !html)) {
        return res
            .status(400)
            .json({ msg: "Campos obrigatórios: para, assunto e texto ou html." });
    }
    try { //cria um objeto de transporte para enviar emails usando a biblioteca Nodemailer
        const transportador = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        const info = await transportador.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: para,
            subject: assunto,
            text: texto,
            html,
        });
        res.status(200).json({ msg: "E-mail enviado com sucesso!", info });
    } catch (erro) {
        res.status(500).json({ msg: "Erro ao enviar e-mail", erro: erro.message });
    }
});

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});