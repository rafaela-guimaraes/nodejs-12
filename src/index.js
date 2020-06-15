const promotions = ["SINGLE LOOK", "DOUBLE LOOK", "TRIPLE LOOK", "FULL LOOK"];

const filterProducts = (ids, productsList) =>
  ids.map((id) => productsList.find((product) => id == product.id));

const getProducts = (productsList) =>
  productsList.map((product) => ({
    name: product["name"],
    category: product["category"],
  }));

function getShoppingCart(ids, productsList) {
  data = {};
  products = filterProducts(ids, productsList);
  data["products"] = getProducts(products);
  return data;
}

module.exports = { getShoppingCart };
