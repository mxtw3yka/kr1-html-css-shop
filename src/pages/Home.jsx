import { useRef, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { OrderForm } from './Order';

const featured = products.filter((product) => product.featured);

export default function Home({ favorites = [], onToggleFavorite }) {
  const dialogRef = useRef(null);
  const [selected, setSelected] = useState(null);

  function openPreview(product) {
    setSelected(product);
    dialogRef.current?.showModal();
  }

  return (
    <div className="shop-page">
      <section className="shop-home-hero" aria-labelledby="shop-home-title">
        <div className="shop-home-hero__photo"><img src={products[0].image} srcSet={`${products[0].imageSmall} 480w, ${products[0].image} 1000w`} sizes="(max-width: 760px) calc(100vw - 36px), 44vw" alt="Механическая клавиатура K-500" width="1000" height="750" fetchPriority="high" /></div>
        <div className="shop-home-hero__shade" />
        <div className="shop-container shop-home-hero__inner"><div className="shop-home-hero__copy">
          <p className="shop-kicker">Техника для работы и своих проектов</p>
          <h1 id="shop-home-title">ТОЧНОСТЬ<br />В КАЖДОЙ<br /><span>ДЕТАЛИ.</span></h1>
          <p>Клавиатуры, ноутбуки и аксессуары без лишнего шума. Выбирайте то, что помогает сосредоточиться на главном.</p>
          <div className="shop-home-hero__actions"><a className="shop-action shop-action--light" href="catalog.html">Смотреть каталог <span aria-hidden="true">↗</span></a><a className="shop-text-link" href="#popular">Популярные товары</a></div>
        </div><div className="shop-home-hero__index" aria-hidden="true">GEAR · 2026 <span /></div></div>
      </section>

      <section className="shop-section shop-section--paper" id="advantages" aria-labelledby="shop-advantages-title"><div className="shop-container">
        <header className="shop-heading"><div><p className="shop-kicker">Наш подход</p><h2 id="shop-advantages-title">Всё по делу.<br />Ничего лишнего.</h2></div><p>Клавиатуры, ноутбуки, аксессуары и услуги — всё для удобной работы с техникой.</p></header>
        <div className="shop-benefits"><article><span>01 /</span><h3>Техника для задач</h3><p>Клавиатуры, мыши, наушники и ноутбуки — каждый товар со своей карточкой, ценой и наличием.</p></article><article><span>02 /</span><h3>Понятный выбор</h3><p>Сравнивайте товары по категории, стоимости и доступности без перехода на сторонние площадки.</p></article><article><span>03 /</span><h3>Помощь с настройкой</h3><p>В каталоге также есть установка оборудования и консультации по подбору техники.</p></article></div>
      </div></section>

      <section className="shop-section shop-section--deep" id="popular" aria-labelledby="shop-popular-title"><div className="shop-container">
        <header className="shop-heading"><div><p className="shop-kicker">Выбор редакции</p><h2 id="shop-popular-title">СВОИ<br />ФАВОРИТЫ.</h2></div><p>Три заметные позиции каталога. Откройте карточку товара или форму с проверкой полей без отправки данных.</p></header>
        <div className="shop-product-grid">{featured.map((product) => <div className="shop-home-product" key={product.id}><ProductCard product={product} favorite={favorites.includes(product.id)} onToggleFavorite={onToggleFavorite} /><button className="shop-home-product__preview" type="button" onClick={() => openPreview(product)}>Открыть форму для {product.name} <span aria-hidden="true">↗</span></button></div>)}</div>
        <a className="shop-action shop-action--outline-light shop-more" href="catalog.html">Все товары <span aria-hidden="true">↗</span></a>
      </div></section>

      <section className="shop-home-end"><div className="shop-container shop-home-end__inner"><div><p className="shop-kicker">Есть вопросы?</p><h2>НАЙДЁМ<br /><span>ПОДХОДЯЩЕЕ.</span></h2></div><div><p>Характеристики и условия для K-200 — в карточке товара. Для связи с магазином воспользуйтесь телефоном или почтой на странице контактов: форма заявки не отправляет сообщения.</p><a className="shop-action shop-action--light" href="contacts.html">Контакты и поддержка <span aria-hidden="true">↗</span></a></div></div></section>

      <dialog className="shop-dialog" ref={dialogRef} aria-labelledby="shop-dialog-title" onClose={() => setSelected(null)}>
        <div className="shop-dialog__head"><div><p className="shop-kicker">Форма заявки</p><h2 id="shop-dialog-title">ПРОВЕРИТЬ ДАННЫЕ.</h2></div><button type="button" className="shop-dialog__close" onClick={() => dialogRef.current?.close()} aria-label="Закрыть форму">×</button></div>
        {selected && <><p className="shop-dialog__product">Выбран товар: <strong>{selected.name}</strong></p><OrderForm key={selected.id} initialProduct={selected} onClose={() => dialogRef.current?.close()} /></>}
      </dialog>
    </div>
  );
}
