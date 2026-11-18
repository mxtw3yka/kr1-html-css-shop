import { useId, useState } from 'react';
import { formatPrice, getProduct, products } from '../data/products';

export function OrderForm({ initialProduct = null, onClose }) {
  const prefix = useId();
  const [confirmation, setConfirmation] = useState('');
  const available = products.filter((item) => item.stock);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selected = getProduct(data.get('product'));
    setConfirmation(`Поля проверены${selected ? ` для «${selected.name}»` : ''}. Данные не отправлены и не сохранены; заказ не создан.`);
  }

  return (
    <form className="shop-order-form" onSubmit={handleSubmit} onReset={() => setConfirmation('')}>
      <div className="shop-form-grid">
        <label htmlFor={`${prefix}-name`}>Имя<input id={`${prefix}-name`} name="name" type="text" minLength="2" autoComplete="given-name" placeholder="Ваше имя" required /></label>
        <label htmlFor={`${prefix}-email`}>E-mail<input id={`${prefix}-email`} name="email" type="email" autoComplete="email" placeholder="example@mail.ru" required /></label>
        <label htmlFor={`${prefix}-phone`}>Телефон<input id={`${prefix}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}" placeholder="+7 (900) 000-00-00" aria-describedby={`${prefix}-phone-hint`} required /><small id={`${prefix}-phone-hint`}>Формат: +7 (900) 000-00-00</small></label>
        <label htmlFor={`${prefix}-date`}>Дата связи<input id={`${prefix}-date`} name="date" type="date" /></label>
        <label htmlFor={`${prefix}-product`}>Товар или услуга<select id={`${prefix}-product`} name="product" defaultValue={initialProduct?.stock ? initialProduct.id : ''}>
          <option value="">Выберите товар</option>
          {available.map((item) => <option key={item.id} value={item.id}>{item.name} — {formatPrice(item.price)}</option>)}
        </select></label>
        <label htmlFor={`${prefix}-topic`}>Тема заявки<select id={`${prefix}-topic`} name="topic" defaultValue={initialProduct ? 'product' : ''} required>
          <option value="">Выберите тему</option>
          <option value="product">Заказ товара</option>
          <option value="consultation">Консультация</option>
          <option value="delivery">Доставка</option>
        </select></label>
        <label className="shop-form-wide" htmlFor={`${prefix}-comment`}>Комментарий<textarea id={`${prefix}-comment`} name="comment" rows="4" placeholder="Укажите дополнительную информацию" /></label>
      </div>
      <label className="shop-form-check"><input name="agreement" type="checkbox" required /> Я понимаю, что форма не отправляет и не сохраняет данные и заказ не создаётся</label>
      <p className="shop-form-note">Форма проверяет поля только в вашем браузере. Контактные данные не поступят в магазин, и ответ по этой форме не придёт.</p>
      <div className="shop-form-actions">
        {onClose ? <button className="shop-action shop-action--outline" type="button" onClick={onClose}>Закрыть</button> : <button className="shop-action shop-action--outline" type="reset">Очистить</button>}
        <button className="shop-action shop-action--accent" type="submit">Проверить заявку <span aria-hidden="true">↗</span></button>
      </div>
      {confirmation && <p className="shop-form-confirmation" role="status">{confirmation}</p>}
    </form>
  );
}

export default function Order() {
  const selectedId = new URLSearchParams(window.location.search).get('product');
  const initialProduct = selectedId ? getProduct(selectedId) : null;

  return (
    <div className="shop-page">
      <section className="shop-page-intro">
        <div className="shop-container">
          <nav className="shop-crumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span aria-hidden="true">/</span><span>Заявка</span></nav>
          <p className="shop-kicker">Заявка / Gear</p>
          <h1>ОБСУДИМ <span>ДЕТАЛИ.</span></h1>
          <p>Выберите технику или тему обращения и проверьте заполнение полей. Форма не отправляет данные и не создаёт заказ.</p>
        </div>
      </section>
      <section className="shop-section shop-section--paper">
        <div className="shop-container shop-order-layout">
          <div className="shop-order-aside"><p className="shop-kicker">01 / Форма</p><h2>Всё по делу.</h2><p>Товар из карточки уже выбран, но его можно изменить. Данные останутся только в форме до закрытия страницы.</p>{selectedId && !initialProduct && <p className="shop-notice" role="status">Товар не найден. Выберите другой из списка.</p>}{initialProduct && !initialProduct.stock && <p className="shop-notice" role="status">{initialProduct.name} сейчас нет в наличии, поэтому выбрать его в форме нельзя.</p>}</div>
          <OrderForm key={initialProduct?.id || 'empty'} initialProduct={initialProduct?.stock ? initialProduct : null} />
        </div>
      </section>
    </div>
  );
}
