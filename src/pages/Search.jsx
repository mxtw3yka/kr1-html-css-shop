import { useState } from 'react';
import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

const normalize = (value) => String(value ?? '').toLocaleLowerCase('ru').replaceAll('ё', 'е');

function resultWord(count) {
  if (count % 100 >= 11 && count % 100 <= 14) return 'результатов';
  if (count % 10 === 1) return 'результат';
  if (count % 10 >= 2 && count % 10 <= 4) return 'результата';
  return 'результатов';
}

export default function Search({ favorites = [], onToggleFavorite }) {
  const [query, setQuery] = useState(() =>
    typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('q') ?? ''
  );
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  const results = products.filter((product) => {
    const text = normalize(`${product.name} ${product.category} ${product.description}`);
    return terms.every((term) => text.includes(term));
  });

  return (
    <div className="feature-page search-page">
      <section className="feature-intro" aria-labelledby="search-title">
        <div className="feature-shell feature-intro-grid">
          <div>
            <h1 id="search-title">Поиск</h1>
            <p>Найдите технику или услугу по названию, описанию и категории.</p>
          </div>
          <p className="feature-intro-aside">
            <strong>Всё в одном каталоге</strong>
            Поиск работает прямо на этой странице и не отправляет запросы на сервер.
          </p>
        </div>
      </section>

      <section className="feature-content" aria-labelledby="search-results-title">
        <div className="feature-shell">
          <form className="feature-search-form" role="search" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="shop-search-input">Что ищете?</label>
            <input
              id="shop-search-input"
              name="q"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Например, ноутбук или настройка"
              autoComplete="off"
            />
          </form>

          <div className="feature-results-heading">
            <h2 id="search-results-title">Товары и услуги</h2>
            <p role="status" aria-live="polite" aria-atomic="true">
              Найдено: {results.length} {resultWord(results.length)}
            </p>
          </div>

          {results.length ? (
            <ul className="feature-card-grid" aria-label="Результаты поиска">
              {results.map((product) => (
                <li key={product.id}>
                  <ProductCard
                    product={product}
                    favorite={favorites.includes(product.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="feature-empty" role="status">
              <h3>Ничего не найдено</h3>
              <p>Попробуйте другое слово или сократите запрос. Например, «мышь», «ноутбук» или «настройка».</p>
              <button type="button" className="feature-action" onClick={() => setQuery('')}>
                Сбросить поиск
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
