import Product from '../models/productModel.js';

const productCtrl = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.send(products);
    } catch (error) {}
  },
  getProductBySlug: async (req, res) => {
    try {
      const { slug } = req.params;
      const product = await Product.findOne({
        slug: slug,
      });
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: 'Product not found' });
      }
    } catch (error) {}
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: 'Product not found' });
      }
    } catch (error) {}
  },
};

export default productCtrl;
