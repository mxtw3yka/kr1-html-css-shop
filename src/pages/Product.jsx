import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { formatPrice, getProduct, k200Gallery, products } from '../data/products';

const specifications = [
  ['Тип', 'Беспроводная, 104 клавиши'], ['Подключение', 'Bluetooth 5.0 и USB-ресивер'],
  ['Раскладка', 'ANSI, английская'], ['Переключатели', 'Мембранные'], ['Подсветка', 'Нет'],
  ['Питание', '2 × AAA, зарядки не требуется'], ['Время работы', 'До 12 месяцев'],
  ['Размеры', '440 × 140 × 25 мм'], ['Вес', '620 г'], ['Гарантия', '24 месяца'],
  ['Комплектация', 'Клавиатура, мышь, USB-ресивер, батарейки AAA'],
];
const tariffs = [
  ['Цена в месяц', '1 000 ₽', '1 800 ₽', '3 000 ₽'],
  ['Каналы поддержки', 'Email', 'Email и телефон', 'Менеджер 24/7'],
  ['Время ответа', '24 часа', '4 часа', '1 час'],
  ['Скидка на следующий заказ', 'Нет', '5%', '10%'],
  ['Отчётность', 'Нет', 'Ежемесячно', 'Ежемесячно и квартальная'],
  ['Способы оплаты', 'Карта', 'Карта, счёт', 'Карта, счёт, по договору'],
];

export default function Product({ favorites = [], onToggleFavorite }) {
  const id = new URLSearchParams(window.location.search).get('id');
  const product = getProduct(id || 'k-200');
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return <div className="shop-page"><section className="shop-page-intro"><div className="shop-container"><nav className="shop-crumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span aria-hidden="true">/</span><a href="catalog.html">Каталог</a><span aria-hidden="true">/</span><span>Товар не найден</span></nav><p className="shop-kicker">Каталог / Gear</p><h1>ТОВАР <span>НЕ НАЙДЕН.</span></h1><p>Такой позиции нет в каталоге. Вернитесь к списку и выберите товар.</p><a className="shop-action shop-action--light" href="catalog.html">Открыть каталог <span aria-hidden="true">↗</span></a></div></section></div>;

  const isK200 = product.id === 'k-200';
  const gallery = isK200 ? k200Gallery : [{ src: product.image, alt: product.name }];
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return (
    <div className="shop-page">
      <section className="shop-product-section"><div className="shop-container">
        <nav className="shop-crumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span aria-hidden="true">/</span><a href="catalog.html">Каталог</a><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span></nav>
        <div className="shop-product-layout"><div className="shop-gallery"><div className="shop-gallery__main"><img src={gallery[selectedImage].src} alt={gallery[selectedImage].alt} width="1000" height="750" /></div>{gallery.length > 1 && <div className="shop-gallery__thumbs" aria-label="Фотографии товара">{gallery.map((image, index) => <button key={image.src} className={index === selectedImage ? 'is-active' : ''} type="button" aria-label={`Показать фото ${index + 1}: ${image.alt}`} aria-pressed={index === selectedImage} onClick={() => setSelectedImage(index)}><img src={image.src} alt="" width="120" height="90" /></button>)}</div>}</div>
          <div className="shop-product-copy"><p className="shop-kicker">{product.category} / Gear</p>{product.badge && <span className="shop-product-badge">{product.badge}</span>}<h1>{product.name}</h1><p className="shop-product-copy__description">{isK200 ? 'Компактная беспроводная клавиатура с мышью в комплекте. Работает по Bluetooth 5.0 и через USB-ресивер, поэтому подходит и к ноутбуку, и к настольному компьютеру.' : product.description}</p>
            <div className="shop-product-price">{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}<strong>{formatPrice(product.price)}</strong></div><p className={`shop-product-availability${product.stock ? '' : ' shop-product-availability--out'}`}>{product.stockLabel}</p>
            {isK200 && <ul className="shop-feature-list"><li>Bluetooth 5.0 и USB-ресивер в комплекте</li><li>Раскладка ANSI, 104 клавиши</li><li>Питание от двух батареек AAA</li><li>Гарантия 24 месяца, возврат 14 дней</li></ul>}
            <div className="shop-product-actions">{product.stock ? <a className="shop-action shop-action--accent" href={`order.html?product=${encodeURIComponent(product.id)}`}>Открыть форму заявки <span aria-hidden="true">↗</span></a> : <span className="shop-product-unavailable">Нет в наличии — заявка недоступна</span>}{onToggleFavorite && <button type="button" className="shop-action shop-action--outline" aria-pressed={favorites.includes(product.id)} onClick={() => onToggleFavorite(product.id)}>{favorites.includes(product.id) ? 'Убрать из избранного' : 'Добавить в избранное'} <span aria-hidden="true">♡</span></button>}</div>
            {!isK200 && <p className="shop-product-honesty">Для этой позиции указаны описание, цена и наличие. Дополнительные характеристики не представлены.</p>}
          </div></div>
      </div></section>
      {isK200 && <>
        <section className="shop-section shop-section--paper" aria-labelledby="shop-spec-title"><div className="shop-container shop-detail-grid"><div><p className="shop-kicker">01 / Параметры</p><h2 id="shop-spec-title">ВСЁ В<br />ДЕТАЛЯХ.</h2><p>Характеристики клавиатуры K-200 и комплекта поставки.</p></div><div className="shop-table-scroll"><table className="shop-table"><caption>Характеристики K-200</caption><thead><tr><th scope="col">Параметр</th><th scope="col">Значение</th></tr></thead><tbody>{specifications.map(([name, value]) => <tr key={name}><th scope="row">{name}</th><td>{value}</td></tr>)}</tbody></table></div></div></section>
        <section className="shop-section shop-section--steel" aria-labelledby="shop-delivery-title"><div className="shop-container shop-detail-grid"><div><p className="shop-kicker">02 / Условия</p><h2 id="shop-delivery-title">ДОСТАВКА<br />И ОПЛАТА.</h2></div><ul className="shop-conditions"><li><span>01</span>Самовывоз из пункта выдачи — бесплатно, сегодня до 19:00</li><li><span>02</span>Курьером по городу — 300 руб., 1–2 дня</li><li><span>03</span>Доставка в другие регионы — 500 руб., 3–5 дней</li><li><span>04</span>Оплата картой, по счёту или при получении</li></ul></div></section>
        <section className="shop-section shop-section--paper" aria-labelledby="shop-tariff-title"><div className="shop-container"><header className="shop-heading"><div><p className="shop-kicker">03 / Обслуживание</p><h2 id="shop-tariff-title">ТАРИФЫ<br />ПОДДЕРЖКИ.</h2></div><p>Сравните стоимость, время ответа и каналы связи для трёх тарифов. Условия приведены для ознакомления и не являются публичной офертой.</p></header><div className="shop-table-scroll"><table className="shop-table shop-table--tariffs"><caption>Сравнение тарифов обслуживания</caption><thead><tr><th scope="col">Возможности</th><th scope="col">Старт</th><th scope="col">Бизнес</th><th scope="col">Премиум</th></tr></thead><tbody>{tariffs.map(([name, ...values]) => <tr key={name}><th scope="row">{name}</th>{values.map((value, index) => <td key={index}>{value}</td>)}</tr>)}</tbody></table></div><a className="shop-action shop-action--dark shop-table-cta" href={`order.html?product=${product.id}`}>Посмотреть форму <span aria-hidden="true">↗</span></a></div></section>
        <section className="shop-section shop-section--deep" aria-labelledby="shop-faq-title"><div className="shop-container shop-detail-grid"><div><p className="shop-kicker">04 / Подробности</p><h2 id="shop-faq-title">ЧАСТЫЕ<br />ВОПРОСЫ.</h2></div><div className="shop-faq"><details><summary>Можно ли оформить заказ через форму?</summary><p>Нет. Форма проверяет поля в браузере, но не отправляет и не сохраняет данные; заказ не создаётся.</p></details><details><summary>Сколько идёт доставка?</summary><p>Ориентировочный срок — 1–4 дня; конкретный способ доставки и срок зависят от региона.</p></details><details><summary>Можно ли вернуть товар?</summary><p>Возврат возможен в течение 14 дней с момента получения.</p></details></div></div></section>
        <section className="shop-section shop-section--paper" aria-labelledby="shop-reviews-title"><div className="shop-container"><header className="shop-heading"><div><p className="shop-kicker">05 / Мнения покупателей</p><h2 id="shop-reviews-title">ОТЗЫВЫ.</h2></div></header><div className="shop-reviews"><blockquote><p>Клавиатура удобная, подключается без проводов за секунду. Мышь из комплекта тоже отличная, ресивер не теряется.</p><footer>Аноним</footer></blockquote><blockquote><p>Взял для лабораторных, батарейки держат долго. Единственное — не хватает подсветки, для ночной работы неудобно.</p><footer>Владимир</footer></blockquote></div></div></section>
      </>}
      {related.length > 0 && <section className="shop-section shop-section--steel" aria-labelledby="shop-related-title"><div className="shop-container"><header className="shop-heading"><div><p className="shop-kicker">Рядом в каталоге</p><h2 id="shop-related-title">СМОТРИТЕ ТАКЖЕ.</h2></div><a className="shop-text-link" href="catalog.html">Все товары <span aria-hidden="true">↗</span></a></header><div className="shop-product-grid">{related.map((item) => <ProductCard key={item.id} product={item} favorite={favorites.includes(item.id)} onToggleFavorite={onToggleFavorite} />)}</div></div></section>}
    </div>
  );
}
