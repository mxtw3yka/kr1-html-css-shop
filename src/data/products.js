// Literal URLs let Vite include every product image in the production bundle.
export const k200Gallery = [
  { src: new URL('../../images/products/keyboard-2.jpg', import.meta.url).href, small: new URL('../../images/products/keyboard-2-480.jpg', import.meta.url).href, thumbnail: new URL('../../images/products/keyboard-2-240.jpg', import.meta.url).href, alt: 'Клавиатура беспроводная K-200 с мышью' },
  { src: new URL('../../images/products/keyboard-2-1.jpg', import.meta.url).href, small: new URL('../../images/products/keyboard-2-1-480.jpg', import.meta.url).href, thumbnail: new URL('../../images/products/keyboard-2-1-240.jpg', import.meta.url).href, alt: 'Клавиатура K-200, крупный план' },
  { src: new URL('../../images/products/keyboard-2-2.jpg', import.meta.url).href, small: new URL('../../images/products/keyboard-2-2-480.jpg', import.meta.url).href, thumbnail: new URL('../../images/products/keyboard-2-2-240.jpg', import.meta.url).href, alt: 'Мышь и USB-ресивер из комплекта K-200' },
];

const productImages = {
  'k-500': [new URL('../../images/products/keyboard-1.jpg', import.meta.url).href, new URL('../../images/products/keyboard-1-480.jpg', import.meta.url).href],
  'k-200': [k200Gallery[0].src, k200Gallery[0].small],
  'm-100': [new URL('../../images/products/mouse-1.jpg', import.meta.url).href, new URL('../../images/products/mouse-1-480.jpg', import.meta.url).href],
  'm-700': [new URL('../../images/products/mouse-2.jpg', import.meta.url).href, new URL('../../images/products/mouse-2-480.jpg', import.meta.url).href],
  'h-300': [new URL('../../images/products/headphones-1.jpg', import.meta.url).href, new URL('../../images/products/headphones-1-480.jpg', import.meta.url).href],
  'h-100': [new URL('../../images/products/headphones-2.jpg', import.meta.url).href, new URL('../../images/products/headphones-2-480.jpg', import.meta.url).href],
  'n-15': [new URL('../../images/products/laptop-1.jpg', import.meta.url).href, new URL('../../images/products/laptop-1-480.jpg', import.meta.url).href],
  'n-14': [new URL('../../images/products/laptop-3.jpg', import.meta.url).href, new URL('../../images/products/laptop-3-480.jpg', import.meta.url).href],
  'n-17': [new URL('../../images/products/laptop-2.jpg', import.meta.url).href, new URL('../../images/products/laptop-2-480.jpg', import.meta.url).href],
  setup: [new URL('../../images/products/service-setup.jpg', import.meta.url).href, new URL('../../images/products/service-setup-480.jpg', import.meta.url).href],
  support: [new URL('../../images/products/service-support.jpg', import.meta.url).href, new URL('../../images/products/service-support-480.jpg', import.meta.url).href],
};

export let products = [];

export async function loadProducts() {
  let source;
  if (import.meta.env.MODE === 'pages') {
    source = (await import('../../backend/data/products.json')).default;
  } else {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error(`Каталог недоступен: HTTP ${response.status}`);
    source = await response.json();
  }

  if (!Array.isArray(source) || source.length !== Object.keys(productImages).length) throw new Error('Некорректные данные каталога');
  const ids = new Set();
  products = source.map((product) => {
    if (!product || typeof product !== 'object' || !Object.hasOwn(productImages, product.id) || ids.has(product.id)
      || typeof product.name !== 'string' || !product.name
      || typeof product.category !== 'string' || !product.category
      || typeof product.description !== 'string'
      || typeof product.stockLabel !== 'string'
      || typeof product.stock !== 'boolean' || typeof product.featured !== 'boolean'
      || !Number.isFinite(product.price) || product.price < 0
      || (product.oldPrice !== null && (!Number.isFinite(product.oldPrice) || product.oldPrice < 0))
      || (product.badge !== null && typeof product.badge !== 'string')) {
      throw new Error('Некорректные данные каталога');
    }
    ids.add(product.id);
    const [image, imageSmall] = productImages[product.id];
    return { ...product, image, imageSmall };
  });
  return products;
}

export const getProduct = (id) => products.find((product) => product.id === id);
const priceFormatter = new Intl.NumberFormat('ru-RU');
export const formatPrice = (price) => `${priceFormatter.format(price)} ₽`;
