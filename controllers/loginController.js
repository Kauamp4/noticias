const usuario = require('../models/loginModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer'); // Biblioteca para envio de e-mails

require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// Função para testar conexão
exports.conexao = (req, res) => {
  res.status(200).json({ msg: "Conexão Ok para Cadastro de Login!" });
};

// Função para cadastrar novo usuário
exports.cadastrar = async (req, res) => {
  console.log("Dados recebidos:", req.body);

  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    // 1. VERIFICA SE O E-MAIL JÁ ESTÁ CADASTRADO NO BANCO
    const usuarioExistente = await usuario.findOne({ email });

    if (usuarioExistente) {
      // Retorna status 409 (Conflict) para avisar o front-end
      return res.status(409).json({ message: "Este e-mail já está cadastrado!" });
    }

    // 2. GERA O HASH DA SENHA COM BCRYPT (após confirmar que o e-mail é único)
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    // 3. SALVA O NOVO USUÁRIO NO BANCO DE DADOS
    const novoUsuario = new usuario({ nome, email, senhaHash });
    await novoUsuario.save();

    // 4. TENTA ENVIAR O E-MAIL DE BOAS-VINDAS
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

      await transportador.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: "Bem-vindo!",
        text: `Olá ${nome}, obrigado por se registrar no site da TECHNEWS!`,
        html: `<h2 style="color: red;">Olá ${nome},</h2><p>Obrigado por se registrar no site da TECHNEWS!</p>`,
      });
    } catch (erroEmail) {
      console.error("Erro ao enviar e-mail de boas-vindas:", erroEmail.message);
      // Não interrompe a resposta de sucesso se o e-mail falhar
    }

    return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });

  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ message: "Erro ao criar usuário no servidor." });
  }
};

// Função para realizar o login do usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  console.log("Email recebido:", email);
  console.log("Senha recebida:", senha);

  try {
    const user = await usuario.findOne({ email });

    console.log("Usuário encontrado:", user);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado"
      });
    }

    const senhaValida = await bcrypt.compare(senha, user.senhaHash);

    console.log("Senha válida:", senhaValida);

    if (!senhaValida) {
      return res.status(401).json({
        message: "Senha incorreta"
      });
    }

    return res.status(200).json({
      message: "Login bem-sucedido!"
    });

  } catch (error) {
    console.error("Erro ao processar login:", error);
    return res.status(500).json({
      message: "Erro ao processar login"
    });
  }
};