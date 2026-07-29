//01
const mongoose = require("mongoose");


const LoginSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senhaHash: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now }
});
const Login = mongoose.model("Login", LoginSchema, "Login");
module.exports = Login;



/*02
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User;
*/

