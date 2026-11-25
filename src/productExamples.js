import { formatPrice, products } from './data/products.js';

// Real catalog data supplies strings, numbers, booleans, and product objects.
const discountedProduct = products.find((product) => product.oldPrice > product.price);
const unavailableProduct = products.find((product) => !product.stock);

function calculateDiscount(product) {
  return product.oldPrice > product.price
    ? Math.round((product.oldPrice - product.price) / product.oldPrice * 100)
    : 0;
}

function determineStatus(product) {
  if (!product.stock) return 'Нет в наличии';
  return product.oldPrice > product.price && product.stock ? 'В наличии со скидкой' : 'В наличии';
}

function conciseDescription(product) {
  return `${product.name} — ${product.description} Цена: ${formatPrice(product.price)}.`;
}

if (discountedProduct && unavailableProduct) {
  console.log('Цена:', formatPrice(discountedProduct.price));
  console.log('Скидка:', `${calculateDiscount(discountedProduct)}%`);
  console.log('Статус:', determineStatus(discountedProduct));
  console.log('Описание:', conciseDescription(discountedProduct));
  console.log('Статус отсутствующего товара:', determineStatus(unavailableProduct));
}
