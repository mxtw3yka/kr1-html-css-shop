import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import Product from './pages/Product.jsx';
import Order from './pages/Order.jsx';
import Contacts from './pages/Contacts.jsx';
import Search from './pages/Search.jsx';
import Cabinet from './pages/Cabinet.jsx';
import { products } from './data/products.js';
import './productExamples.js';
import './styles/pages.css';
import './styles/features.css';

const themeKey = 'gear-theme';
const previousThemeKey = 'shopproject-theme';
const favoritesKey = 'gear-favorites';
const previousFavoritesKey = 'shopproject-favorites';
const pages = {
  'index.html': { title: 'Главная', component: Home },
  'catalog.html': { title: 'Каталог', component: Catalog },
  'product.html': { title: 'Товар', component: Product },
  'order.html': { title: 'Заявка', component: Order },
  'contacts.html': { title: 'Контакты', component: Contacts },
  'search.html': { title: 'Поиск', component: Search },
  'cabinet.html': { title: 'Кабинет', component: Cabinet },
};

function storedFavorites() {
  try {
    const ids = JSON.parse(localStorage.getItem(favoritesKey) ?? localStorage.getItem(previousFavoritesKey) ?? '[]');
    return Array.isArray(ids) ? ids.filter((id) => products.some((product) => product.id === id)) : [];
  } catch {
    return [];
  }
}

function App() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const current = pages[page] || pages['index.html'];
  const Page = current.component;
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  const [favorites, setFavorites] = useState(storedFavorites);

  useEffect(() => {
    document.title = `${current.title} — Gear`;
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(themeKey, theme); localStorage.removeItem(previousThemeKey); } catch { /* Storage may be unavailable. */ }
  }, [current.title, theme]);

  useEffect(() => {
    try { localStorage.setItem(favoritesKey, JSON.stringify(favorites)); localStorage.removeItem(previousFavoritesKey); } catch { /* Favorites remain in memory. */ }
  }, [favorites]);

  useEffect(() => {
    if (!window.location.hash) return;
    requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView());
  }, []);

  const toggleTheme = () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('theme-switching');
      window.setTimeout(() => document.documentElement.classList.remove('theme-switching'), 450);
    }
    setTheme((value) => value === 'dark' ? 'light' : 'dark');
  };

  const onToggleFavorite = (id) => {
    setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  return (
    <Layout page={page} theme={theme} onThemeToggle={toggleTheme} favoritesCount={favorites.length}>
      <Page favorites={favorites} onToggleFavorite={onToggleFavorite} />
    </Layout>
  );
}

createRoot(document.getElementById('root')).render(<App />);
