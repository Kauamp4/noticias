const usuario = require('../models/loginModel');

const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');

require('dotenv').config();

// FUNÇÃO PARA TESTAR CONEXÃO

exports.conexao = (req, res) => {

  res.status(200).json({
    msg: "Conexão Ok para Cadastro de Login!"
  });

};


// CADASTRAR NOVO USUÁRIO
exports.cadastrar = async (req, res) => {

  console.log("Dados recebidos:", req.body);

  const { nome, email, senha } = req.body;


  if (!nome || !email || !senha) {

    return res.status(400).json({
      message: "Todos os campos são obrigatórios."
    });

  }


  try {

    // Verifica se o e-mail já existe

    const usuarioExistente = await usuario.findOne({ email });


    if (usuarioExistente) {

      return res.status(409).json({
        message: "Este e-mail já está cadastrado!"
      });

    }


    // Cria hash da senha

    const salt = await bcrypt.genSalt(12);

    const senhaHash = await bcrypt.hash(senha, salt);


    // Cria usuário

    const novoUsuario = new usuario({

      nome,
      email,
      senhaHash

    });


    await novoUsuario.save();

    // ENVIO DO E-MAIL
    try {

      const transportador = nodemailer.createTransport({

        host: process.env.SMTP_HOST,

        port: process.env.SMTP_PORT,

        secure: process.env.SMTP_SECURE === "true",

        auth: {

          user: process.env.SMTP_USER,

          pass: process.env.SMTP_PASS

        }

      });


      await transportador.sendMail({

        from:
          process.env.SMTP_FROM ||
          process.env.SMTP_USER,

        to: email,

        subject: "Bem-vindo!",

        text:
          `Olá ${nome}, obrigado por se registrar no site da TECHNEWS!`,

        html:
          `<h2 style="color: red;">
                        Olá ${nome},
                    </h2>

                    <p>
                        Obrigado por se registrar no site da TECHNEWS!
                    </p>`

      });


    } catch (erroEmail) {

      console.error(
        "Erro ao enviar e-mail de boas-vindas:",
        erroEmail.message
      );

    }


    return res.status(201).json({

      message:
        "Usuário cadastrado com sucesso!"

    });


  } catch (error) {

    console.error(
      "Erro ao criar usuário:",
      error
    );


    return res.status(500).json({

      message:
        "Erro ao criar usuário no servidor."

    });

  }

};


// LOGIN
exports.login = async (req, res) => {

  const { email, senha } = req.body;

  console.log("Email recebido:", email);

  try {

    // Procura usuário pelo e-mail
    const user = await usuario.findOne({ email });

    console.log("Usuário encontrado:", user);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado"
      });
    }

    // Compara senha digitada com hash
    const senhaValida = await bcrypt.compare(
      senha,
      user.senhaHash
    );

    // ===================================
    // LOG ADICIONADO PARA TESTAR A SENHA
    // ===================================
    console.log("Senha válida:", senhaValida);

    if (!senhaValida) {
      return res.status(401).json({
        message: "Senha incorreta"
      });
    }

    // CRIAR TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    );

    // ===================================
    // LOG ADICIONADO PARA TESTAR O TOKEN
    // ===================================
    console.log("Token criado:", token);

    // RESPONDER AO FRONTEND
    return res.status(200).json({
      message: "Login bem-sucedido!",
      token: token,
      usuario: {
        id: user._id,
        nome: user.nome,
        email: user.email
      }
    });

  } catch (error) {

    console.error(
      "Erro ao processar login:",
      error
    );

    return res.status(500).json({
      message: "Erro ao processar login"
    });

  }

};

// BUSCAR DADOS DO PERFIL PROTEGIDO
exports.perfil = async (req, res) => {
  try {
    // req.usuarioId vem do middleware authMiddleware
    const user = await usuario.findById(req.usuarioId).select('-senhaHash');

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return res.status(500).json({ message: "Erro ao buscar dados do perfil" });
  }
};
