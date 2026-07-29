const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

async function main() {
  await mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.aocdngy.mongodb.net/DB_Front?appName=Cluster0`
  );  
  console.log("Conectou ao banco de dados!!!");
}

main().catch((err) => console.log(err));
module.exports = main;