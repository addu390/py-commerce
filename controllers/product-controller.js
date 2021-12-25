const Product = require("../models/product-model");

const getProducts = async (req, res) => {
  try {
    const result = await Product.find({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getProductsByCategory = async (req, res) => {
  const cName = req.params.categoryName;
  try {
    if (cName === "top_deals") {
      const result = await Product.find({}).skip(15);
      res.json(result);
    } else if (cName === "top_offers") {
      const result = await Product.find({}).skip(5);
      res.json(result);
    } else {
      const result = await Product.find({ category: cName });
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await Product.findById(productId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const addProduct = async (req, res) => {
  console.log(req.body)
  const productData = {
    url: req.body.url,
    detailUrl: req.body.url,
    title: {
      shortTitle: req.body.title,
      longTitle: req.body.description,
    },
    price: {
      mrp: req.body.mrp,
      cost: req.body.cost,
      discount: req.body.discount,
    },
    tagline: req.body.tag,
    category: req.body.category,
  };
  try {
    const product = new Product(productData);
    await product.save();
    res.json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductById,
  addProduct,
};
