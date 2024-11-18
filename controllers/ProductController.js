const Product = require("../models/Product");
const Category = require("../models/Category");

async function create(req, res) {
  const { name, description, amount, price, categories } = req.body;

  if (!name || !description || !amount || !price) {
    return res.status(422).json({ msg: "Todos os campos obrigatórios (name, description, amount, price) devem ser preenchidos!" });
  }

  if (categories && categories.length > 0) {
    const validCategories = await Category.find({ '_id': { $in: categories } });

    if (validCategories.length !== categories.length) {
      return res.status(400).json({ msg: "Uma ou mais categorias não existem no banco de dados." });
    }
  }

  const newProduct = new Product({
    name,
    description,
    amount,
    price,
    categories: categories || [],
  });

  try {
    const savedProduct = await newProduct.save();

    if (categories && categories.length > 0) {
      await Category.updateMany(
        { '_id': { $in: categories } },
        { $push: { products: savedProduct._id } }
      );
    }

    res.status(201).json({ msg: "Produto criado com sucesso!", product: savedProduct });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function getAll(req, res) {
  try {
    const products = await Product.find().populate("categories");  
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function getById(req, res) {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate("categories");
    if (!product) {
      return res.status(404).json({ msg: "Produto não encontrado!" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function update(req, res) {
  const { id } = req.params; 
  const { name, description, amount, price, categories } = req.body; 

  if (!name || !description || !amount || !price) {
    return res.status(422).json({ msg: "Todos os campos obrigatórios (name, description, amount, price) devem ser preenchidos!" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,  
      { name, description, amount, price, categories },  
      { new: true } 
    ).populate("categories");

    if (!updatedProduct) {
      return res.status(404).json({ msg: "Produto não encontrado!" });
    }

    res.status(200).json({ msg: "Produto atualizado com sucesso!", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update
};
