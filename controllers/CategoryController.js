const Category = require("../models/Category");

async function create(req, res) {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(422).json({ msg: "Campos 'name' e 'description' são obrigatórios!" });
  }

  const newCategory = new Category({ name, description });

  try {
    await newCategory.save();
    res.status(201).json({ msg: "Categoria criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function update(req, res) {
  const { name, description } = req.body;
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json({ msg: "Categoria não encontrada!" });
  }

  category.name = name || category.name;
  category.description = description || category.description;

  try {
    await category.save();
    res.status(200).json({ msg: "Categoria atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function getAll(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

async function getById(req, res) {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ msg: "Categoria não encontrada!" });
    }
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  create,
  update,
  getAll,
  getById,
};
