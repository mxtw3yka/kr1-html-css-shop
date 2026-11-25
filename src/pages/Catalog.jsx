import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const initialFilters = { category: '', badge: '', min: '', max: '', stock: '', sort: 'popular' };

export default function Catalog({ favorites = [], onToggleFavorite }) {
  const [filters, setFilters] = useState(initialFilters);
  const categories = [...new Set(products.map((product) => product.category))];
  const change = (key) => (event) => setFilters((current) => ({ ...current, [key]: event.target.value }));
  const visible = products.filter((product) => (
    (!filters.category || product.category === filters.category) &&
    (!filters.badge || (filters.badge === 'Популярные' ? product.featured : product.badge === filters.badge)) &&
    (filters.min === '' || product.price >= Number(filters.min)) &&
    (filters.max === '' || product.price <= Number(filters.max)) &&
    (!filters.stock || (filters.stock === 'available' ? product.stock : !product.stock))
  )).sort((a, b) => {
    if (filters.sort === 'cheap') return a.price - b.price;
    if (filters.sort === 'expensive') return b.price - a.price;
    if (filters.sort === 'new') return Number(b.badge === 'Новинка') - Number(a.badge === 'Новинка');
    return Number(b.featured) - Number(a.featured);
  });

  return (
    <div className="shop-page">
      <section className="shop-page-intro"><div className="shop-container"><nav className="shop-crumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span aria-hidden="true">/</span><span>Каталог</span></nav><p className="shop-kicker">Каталог / Gear</p><h1>ВЫБИРАЙ <span>ТОЧНО.</span></h1><p>Одиннадцать товаров и услуг для работы и повседневных задач. Настройте фильтры, чтобы найти своё.</p></div></section>
      <section className="shop-section shop-section--paper" aria-label="Товары каталога"><div className="shop-container shop-catalog-layout">
        <aside className="shop-filters" aria-labelledby="shop-filter-title"><div className="shop-filters__head"><p className="shop-kicker">01 / Параметры</p><h2 id="shop-filter-title">Фильтры</h2></div>
          <div className="shop-filters__fields"><label htmlFor="shop-category">Категория<select id="shop-category" value={filters.category} onChange={change('category')}><option value="">Все категории</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
            <label htmlFor="shop-badge">Подборка<select id="shop-badge" value={filters.badge} onChange={change('badge')}><option value="">Все товары</option><option value="Популярные">Популярные</option><option value="Новинка">Новинки</option><option value="Скидка">Скидки</option></select></label>
            <fieldset><legend>Цена, ₽</legend><div className="shop-filter-prices"><label htmlFor="shop-min">От<input id="shop-min" type="number" min="0" inputMode="numeric" placeholder="0" value={filters.min} onChange={change('min')} /></label><label htmlFor="shop-max">До<input id="shop-max" type="number" min="0" inputMode="numeric" placeholder="78000" value={filters.max} onChange={change('max')} /></label></div></fieldset>
            <label htmlFor="shop-stock">Наличие<select id="shop-stock" value={filters.stock} onChange={change('stock')}><option value="">Любое</option><option value="available">В наличии / услуги</option><option value="out">Нет в наличии</option></select></label>
          </div><button className="shop-reset" type="button" onClick={() => setFilters(initialFilters)}>Сбросить фильтры <span aria-hidden="true">↺</span></button>
        </aside>
        <div className="shop-catalog-results"><div className="shop-catalog-toolbar"><div><p className="shop-kicker">02 / Товары</p><h2>Список товаров</h2><p role="status">Найдено: {visible.length} из {products.length}</p></div><label htmlFor="shop-sort">Сортировка<select id="shop-sort" value={filters.sort} onChange={change('sort')}><option value="popular">По популярности</option><option value="cheap">Сначала дешевле</option><option value="expensive">Сначала дороже</option><option value="new">Сначала новинки</option></select></label></div>
          {visible.length ? <div className="shop-product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onToggleFavorite={onToggleFavorite} />)}</div> : <div className="shop-empty"><h3>Ничего не найдено.</h3><p>Попробуйте изменить диапазон цены или сбросить фильтры.</p><button type="button" className="shop-action shop-action--dark" onClick={() => setFilters(initialFilters)}>Показать все товары <span aria-hidden="true">↗</span></button></div>}
        </div>
      </div></section>
    </div>
  );
}
