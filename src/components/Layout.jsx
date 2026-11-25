import { useEffect, useId, useState } from 'react';
import '../styles/base.css';
import '../styles/shell.css';
import wrenchUp from '../assets/wrench-up.svg';

const navigation = [
  { href: 'index.html', label: 'Главная' },
  { href: 'catalog.html', label: 'Каталог' },
  { href: 'contacts.html', label: 'Контакты' },
];

function Brand() {
  const cutoutId = useId();
  return (
    <a className="brand" href="index.html">
      <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><defs><mask id={cutoutId}><rect width="48" height="48" fill="white"/><path d="M31 17a10 10 0 1 0 2 10v-3h-9" fill="none" stroke="black" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></mask></defs><path d="M20 2h8l1 5 4 2 4-3 5 5-3 4 2 4 5 1v8l-5 1-2 4 3 4-5 5-4-3-4 2-1 5h-8l-1-5-4-2-4 3-5-5 3-4-2-4-5-1v-8l5-1 2-4-3-4 5-5 4 3 4-2z" fill="currentColor" mask={`url(#${cutoutId})`}/></svg>
      <span className="brand-type"><strong>GEAR</strong><small>магазин электроники</small></span>
    </a>
  );
}

function Icon({ name }) {
  if (name === 'search') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
  if (name === 'cabinet') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5" /><path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2" /></svg>;
  if (name === 'sun') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41" /></svg>;
  if (name === 'moon') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.4A8.8 8.8 0 0 1 8.6 3.5 8.8 8.8 0 1 0 20.5 15.4Z" /></svg>;
  if (name === 'phone') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h3l1.5 5-2 2a15 15 0 0 0 6.5 6.5l2-2L22 15v3a4 4 0 0 1-4 4A16 16 0 0 1 2 6a4 4 0 0 1 4-4Z" /></svg>;
  if (name === 'mail') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m3 6 9 7 9-7" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}
function SocialIcon({ name }) {
  return name === 'vk'
    ? <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2 7.5c.13 6.3 3.35 10.08 9 10.08h.32v-3.6c1.9.2 3.34 1.58 3.92 3.6H18c-.74-2.74-2.7-4.26-3.93-4.84 1.23-.72 2.95-2.46 3.37-5.24h-2.52c-.55 2.07-2.1 3.83-3.6 4.01V7.5H8.8v7.02C7.28 14.13 5.35 12.24 5.27 7.5H2Z" /></svg>
    : <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m21.6 4.2-3.2 15.1c-.24 1.06-.87 1.32-1.76.82l-4.87-3.59-2.35 2.26c-.26.26-.48.48-.98.48l.35-4.94 8.99-8.12c.39-.35-.09-.54-.61-.19L6.05 13.1l-4.78-1.49c-1.04-.32-1.06-1.04.22-1.54L20.18 2.9c.87-.32 1.63.2 1.42 1.3Z" /></svg>;
}


export default function Layout({ page, theme, onThemeToggle, favoritesCount = 0, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 500);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Перейти к содержимому</a>
      <header className="site-header" id="top">
        <div className="hours-strip"><div className="shell hours-strip-inner"><span>Gear · ежедневно 10:00–22:00</span><span>Поддержка: <a href="tel:+74951202200">+7 (495) 120-22-00</a></span></div></div>
        <nav className="shell header-inner" aria-label="Основная навигация">
          <Brand />
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setMenuOpen(open => !open)}><span /><span /><span /></button>
          <div className={`header-navigation${menuOpen ? ' is-open' : ''}`} id="site-navigation">
            <ul className="primary-nav">{navigation.map(item => <li key={item.href}><a href={item.href} aria-current={page === item.href ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a></li>)}</ul>
            <div className="header-tools">
              <a className="header-utility" href="search.html" aria-label="Поиск" aria-current={page === 'search.html' ? 'page' : undefined}><Icon name="search" /></a>
              <a className="header-utility cabinet-link" href="cabinet.html" aria-label={`Личный кабинет, избранных товаров: ${favoritesCount}`} aria-current={page === 'cabinet.html' ? 'page' : undefined}><Icon name="cabinet" />{favoritesCount > 0 && <span className="favorites-count" aria-hidden="true">{favoritesCount}</span>}</a>
              <button className="header-utility theme-toggle" type="button" onClick={onThemeToggle} aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'} title={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}><Icon name={theme === 'light' ? 'moon' : 'sun'} /></button>
            </div>
            <a className="header-order" href="catalog.html">Выбрать товар <span aria-hidden="true">↗</span></a>
          </div>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="site-footer" id="footer">
        <div className="shell">
          <div className="footer-top">
            <div className="footer-identity"><Brand /><p>Техника для жизни и работы.</p><p className="footer-note">Выбирайте устройство в каталоге.</p></div>
            <nav className="footer-links" aria-label="Навигация внизу страницы"><h2>Разделы</h2><a href="index.html">Главная</a><a href="catalog.html">Каталог</a><a href="contacts.html">Контакты</a><a href="search.html">Поиск</a><a href="cabinet.html">Избранное</a><a href="https://github.com/mxtw3yka/kr1-html-css-shop/blob/main/images/products/CREDITS.md" target="_blank" rel="noopener noreferrer">Источники фото</a></nav>
            <div className="footer-contact">
              <h2>Связаться с нами</h2>
              <p className="footer-contact-line"><Icon name="phone" /><span>Телефон: <a href="tel:+74951202200">+7 (495) 120-22-00</a></span></p>
              <p className="footer-hours">Ежедневно с 10:00 до 22:00</p>
              <p className="footer-contact-line"><Icon name="mail" /><span>Почта: <a href="mailto:hello@gear.com">hello@gear.com</a></span></p>
              <p className="footer-social-label">Найти Gear</p>
              <div className="social-links">
                <a className="social-link" href="https://yandex.ru/search/?text=Gear+ВКонтакте" target="_blank" rel="noopener noreferrer"><SocialIcon name="vk" />Найти Gear во ВКонтакте</a>
                <a className="social-link" href="https://yandex.ru/search/?text=Gear+Telegram" target="_blank" rel="noopener noreferrer"><SocialIcon name="telegram" />Найти Gear в Telegram</a>
              </div>
            </div>
            <div className="footer-visit-card"><h2>Gear — онлайн</h2><p className="footer-location-line"><Icon name="location" /><span>Москва, Багратионовский проезд, 7к3</span></p><p>Адрес отмечен на карте ниже.</p><a className="footer-cta" href="catalog.html">Перейти к товарам <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="footer-map" id="map"><div className="footer-map-copy"><strong>Как нас найти</strong><span>Москва, Багратионовский проезд, 7к3.</span></div><iframe title="Карта: Москва, Багратионовский проезд, 7к3" src="https://www.openstreetmap.org/export/embed.html?bbox=37.4992%2C55.7390%2C37.5092%2C55.7453&layer=mapnik&marker=55.7421453%2C37.5042005" loading="lazy" referrerPolicy="no-referrer" /></div>
          <div className="footer-bottom">© {new Date().getFullYear()} Gear. Все права защищены.</div>
        </div>
      </footer>
      <button className={`back-to-top${showTop ? ' is-visible' : ''}`} type="button" aria-label="Вернуться наверх" tabIndex={showTop ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><img src={wrenchUp} alt="" width="30" height="30" /></button>
    </>
  );
}
