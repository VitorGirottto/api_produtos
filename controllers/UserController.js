const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function register(req, res) {
  const { username, email, password, confirmpassword } = req.body;

  if (!username || !email || !password) {
    return res.status(422).json({ msg: "Campos obrigatórios não preenchidos!" });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "As senhas não correspondem!" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(422).json({ msg: "Este e-mail já está cadastrado!" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, passwordHash });

  try {
    await newUser.save();
    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({ msg: "Campos obrigatórios não preenchidos!" });
  }

  const user = await User.findOne({ username });
  
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  
  if (!isValidPassword) {
    return res.status(422).json({ msg: "Senha inválida!" });
  }

  const secret = process.env.SECRET;
  const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });

  res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
}

module.exports = {
  register,
  login
};
