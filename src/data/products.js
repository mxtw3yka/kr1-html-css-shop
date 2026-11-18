// Literal URLs let Vite include every product image in the production bundle.
export const k200Gallery = [
  { src: new URL('../../images/products/keyboard-2.jpg', import.meta.url).href, alt: 'Клавиатура беспроводная K-200 с мышью' },
  { src: new URL('../../images/products/keyboard-2-1.jpg', import.meta.url).href, alt: 'Клавиатура K-200, крупный план' },
  { src: new URL('../../images/products/keyboard-2-2.jpg', import.meta.url).href, alt: 'Мышь и USB-ресивер из комплекта K-200' },
];

export const products = [
  {
    id: 'k-500', name: 'Клавиатура механическая K-500', category: 'Клавиатуры', price: 4500, oldPrice: null,
    image: new URL('../../images/products/keyboard-1.jpg', import.meta.url).href,
    description: 'Полноразмерная механика с подсветкой и съёмным кабелем.',
    stock: true, stockLabel: 'В наличии', badge: 'Хит', featured: true,
  },
  {
    id: 'k-200', name: 'Клавиатура беспроводная K-200', category: 'Клавиатуры', price: 3200, oldPrice: 3900,
    image: k200Gallery[0].src,
    description: 'Беспроводная клавиатура с мышью и USB-ресивером в комплекте.',
    stock: true, stockLabel: 'Осталось 3 шт.', badge: 'Новинка', featured: false,
  },
  {
    id: 'm-100', name: 'Мышь беспроводная M-100', category: 'Мыши', price: 1900, oldPrice: 2400,
    image: new URL('../../images/products/mouse-1.jpg', import.meta.url).href,
    description: 'Тихая беспроводная мышь с аккуратным оптическим сенсором.',
    stock: true, stockLabel: 'Осталось 2 шт.', badge: 'Скидка', featured: true,
  },
  {
    id: 'm-700', name: 'Мышь игровая M-700', category: 'Мыши', price: 3500, oldPrice: null,
    image: new URL('../../images/products/mouse-2.jpg', import.meta.url).href,
    description: 'Шесть кнопок, регулировка DPI и мягкий провод.',
    stock: true, stockLabel: 'В наличии', badge: null, featured: false,
  },
  {
    id: 'h-300', name: 'Наушники беспроводные H-300', category: 'Наушники', price: 5600, oldPrice: null,
    image: new URL('../../images/products/headphones-1.jpg', import.meta.url).href,
    description: 'Лёгкие наушники с шумоподавлением и зарядкой на 20 часов.',
    stock: true, stockLabel: 'В наличии', badge: 'Новинка', featured: true,
  },
  {
    id: 'h-100', name: 'Гарнитура с микрофоном H-100', category: 'Наушники', price: 2900, oldPrice: 3400,
    image: new URL('../../images/products/headphones-2.jpg', import.meta.url).href,
    description: 'Гарнитура для звонков и игр с подвижным микрофоном.',
    stock: true, stockLabel: 'Осталось 4 шт.', badge: 'Скидка', featured: false,
  },
  {
    id: 'n-15', name: 'Ноутбук 15" N-15', category: 'Ноутбуки', price: 64000, oldPrice: null,
    image: new URL('../../images/products/laptop-1.jpg', import.meta.url).href,
    description: 'Ноутбук с 15-дюймовым экраном и 8 ГБ оперативной памяти для работы и повседневных задач.',
    stock: true, stockLabel: 'В наличии', badge: null, featured: false,
  },
  {
    id: 'n-14', name: 'Ноутбук 14" N-14', category: 'Ноутбуки', price: 41000, oldPrice: null,
    image: new URL('../../images/products/laptop-3.jpg', import.meta.url).href,
    description: 'Компактный ноутбук для работы и поездок.',
    stock: true, stockLabel: 'В наличии', badge: null, featured: false,
  },
  {
    id: 'n-17', name: 'Ноутбук 17" N-17', category: 'Ноутбуки', price: 78000, oldPrice: null,
    image: new URL('../../images/products/laptop-2.jpg', import.meta.url).href,
    description: 'Ноутбук ждёт новую поставку, уточните сроки у менеджера.',
    stock: false, stockLabel: 'Нет в наличии', badge: 'Закончился', featured: false,
  },
  {
    id: 'setup', name: 'Настройка оборудования', category: 'Услуги', price: 2000, oldPrice: null,
    image: new URL('../../images/products/service-setup.jpg', import.meta.url).href,
    description: 'Услуга: установка, обновление и проверка техники на месте.',
    stock: true, stockLabel: 'Услуга', badge: null, featured: false,
  },
  {
    id: 'support', name: 'Сопровождение проекта', category: 'Услуги', price: 500, oldPrice: null,
    image: new URL('../../images/products/service-support.jpg', import.meta.url).href,
    description: 'Услуга: консультации по подбору техники в течение месяца.',
    stock: true, stockLabel: 'Услуга', badge: null, featured: false,
  },
];

export const getProduct = (id) => products.find((product) => product.id === id);
const priceFormatter = new Intl.NumberFormat('ru-RU');
export const formatPrice = (price) => `${priceFormatter.format(price)} ₽`;
