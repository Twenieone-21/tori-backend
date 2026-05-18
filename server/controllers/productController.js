let products = [];

exports.getProducts = (req, res) => {
  res.json(products);
};

exports.addProduct = (req, res) => {
  const newProduct = {
    id: Date.now(),
    ...req.body
  };
  products.push(newProduct);
  res.json(newProduct);
};

exports.updateStock = (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  products = products.map(p =>
    p.id == id ? { ...p, stock } : p
  );

  res.json({ message: "Updated" });
};

exports.deleteProduct = (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.json({ message: "Deleted" });
};