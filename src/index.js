const promotions = ["SINGLE LOOK", "DOUBLE LOOK", "TRIPLE LOOK", "FULL LOOK"];

const filterProducts = (ids, productsList) =>
  ids.map((id) => productsList.find((product) => id == product.id));

const getProducts = (productsList) =>
  productsList.map((product) => ({
    name: product.name,
    category: product.category,
  }));

const getCategories = (products) => products.map((product) => product.category);

const getPromotion = (categories) =>
  promotions[
    categories.filter(
      (category, count) => categories.indexOf(category) === count
    ).length - 1
  ];

const getRegularPrices = (products) =>
  products.map((product) => product.regularPrice);

const getPromotionPrice = (product, promotion) => {
  if (product.promotions === undefined) return 0;

  let price = 0;
  product.promotions.forEach(function (p) {
    if (p.looks.includes(promotion)) {
      price = p.price;
    }
  });

  return price;
};

const getTotalPriceWithDiscount = (products, promotion) => {
  const prices = products.map(
    (product) => getPromotionPrice(product, promotion) || product.regularPrice
  );
  return prices.reduce((totalPrice, price) => (totalPrice += price), 0).toFixed(2);
};

const getTotalPrice = (regularPrices) =>
  regularPrices
    .reduce((totalPrice, price) => (totalPrice += price), 0)
    .toFixed(2);

const getDiscountValue = (regularPrice, totalPrice) =>
  (regularPrice - totalPrice).toFixed(2);

const getDiscountPercentage = (regularPrice, discountValue) =>
  ((discountValue * 100) / regularPrice).toFixed(2) + "%";

function getShoppingCart(ids, productsList) {
  data = {};

  products = filterProducts(ids, productsList);

  data.promotion = getPromotion(getCategories(products));

  const totalPrice = getTotalPrice(getRegularPrices(products));
  const totalPriceWithDiscount = getTotalPriceWithDiscount(
    products,
    data.promotion
  );
  data.totalPrice = totalPriceWithDiscount;
  data.discountValue = getDiscountValue(totalPrice, totalPriceWithDiscount);
  data.discount = getDiscountPercentage(totalPrice, data.discountValue);

  data.products = getProducts(products);

  return data;
}

module.exports = { getShoppingCart };
