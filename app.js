const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const generalRoutes = require("./routes/general");
const authRoutes = require("./routes/auth");  

app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/general", generalRoutes);
app.use("/auth", authRoutes); 

const dbUser = process.env.DB_USER; 
const dbPassword = process.env.DB_PASS; 
const dbHost = process.env.MONGO_HOST;
const dbDatabase = process.env.MONGO_DATABASE;

const mongoUri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbDatabase}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectou ao banco!");
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((err) => {
    console.log("Erro ao conectar ao banco:", err);
  });
