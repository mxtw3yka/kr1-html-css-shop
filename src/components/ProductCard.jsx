import { formatPrice } from '../data/products';

export default function ProductCard({ product, favorite = false, onToggleFavorite }) {
  return (
    <article className="shop-card">
      <div className="shop-card__media">
        <a href={`product.html?id=${encodeURIComponent(product.id)}`} aria-label={`Подробнее: ${product.name}`}>
          <img src={product.image} srcSet={`${product.imageSmall} 480w, ${product.image} 1000w`} sizes="(max-width: 540px) calc(100vw - 36px), (max-width: 760px) 45vw, (max-width: 1000px) 32vw, 400px" alt={product.name} width="1000" height="750" loading="lazy" />
        </a>
        {product.badge && <span className="shop-card__badge">{product.badge}</span>}
        {onToggleFavorite && (
          <button className="shop-card__favorite" type="button" aria-pressed={favorite} aria-label={`${favorite ? 'Убрать из избранного' : 'Добавить в избранное'}: ${product.name}`} onClick={() => onToggleFavorite(product.id)}>
            {favorite ? '♥' : '♡'}
          </button>
        )}
      </div>
      <div className="shop-card__body">
        <p className="shop-card__category">{product.category}</p>
        <h3><a href={`product.html?id=${encodeURIComponent(product.id)}`}>{product.name}</a></h3>
        <p className="shop-card__description">{product.description}</p>
        <p className={`shop-card__stock${product.stock ? '' : ' shop-card__stock--out'}`}>{product.stockLabel}</p>
        <div className="shop-card__bottom">
          <div className="shop-card__prices">{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}<strong>{formatPrice(product.price)}</strong></div>
          <a className="shop-card__link" href={`product.html?id=${encodeURIComponent(product.id)}`} aria-label={`Подробнее: ${product.name}`}>Подробнее <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  );
}
