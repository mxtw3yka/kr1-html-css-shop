import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

function favoriteWord(count) {
  if (count % 100 >= 11 && count % 100 <= 14) return 'товаров и услуг';
  if (count % 10 === 1) return 'товар или услуга';
  if (count % 10 >= 2 && count % 10 <= 4) return 'товара или услуги';
  return 'товаров и услуг';
}

export default function Cabinet({ favorites = [], onToggleFavorite }) {
  const selected = products.filter((product) => favorites.includes(product.id));

  return (
    <div className="feature-page cabinet-page">
      <section className="feature-intro" aria-labelledby="cabinet-title">
        <div className="feature-shell feature-intro-grid">
          <div>
            <h1 id="cabinet-title">Избранное</h1>
            <p>Техника и услуги, к которым хочется вернуться. Добавляйте их в подборку из каталога.</p>
          </div>
          <p className="feature-intro-aside">
            <strong>Без аккаунта</strong>
            Это локальная подборка на этом устройстве, а не личный кабинет с регистрацией.
          </p>
        </div>
      </section>

      <section className="feature-content" aria-labelledby="cabinet-list-title">
        <div className="feature-shell">
          <div className="feature-results-heading feature-cabinet-heading">
            <h2 id="cabinet-list-title">Сохранённое <span className="feature-count" aria-live="polite">{selected.length}</span></h2>
            <p>{selected.length} {favoriteWord(selected.length)} в подборке</p>
          </div>
          <p className="feature-storage-note">
            Избранное хранится только в этом браузере на этом устройстве. Оно не синхронизируется,
            может исчезнуть при очистке данных сайта и не создаёт заявку или заказ.
          </p>

          {selected.length ? (
            <ul className="feature-card-grid" aria-label="Сохранённые товары и услуги">
              {selected.map((product) => (
                <li key={product.id}>
                  <ProductCard
                    product={product}
                    favorite
                    onToggleFavorite={onToggleFavorite}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="feature-empty" role="status">
              <h3>Пока ничего не сохранено</h3>
              <p>Посмотрите каталог и добавьте товары или услуги, к которым хотите вернуться.</p>
              <a className="feature-action" href="catalog.html">Перейти в каталог</a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
