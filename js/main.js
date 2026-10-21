// Получаем элементы интерфейса. На разных страницах они могут отсутствовать,
// поэтому ниже каждое использование проверяется на наличие элемента.
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');
const toTopButton = document.getElementById('to-top');

// Кнопка, по которой открыли модальное окно.
// После отправки заявки переводим её в состояние «Заявка отправлена».
let activeOrderButton = null;

// Перебираем все кнопки «Заказать» и открываем модальное окно.
// Блок работает только на странице, где есть и кнопки, и модальное окно.
if (orderDialog && selectedProductInput) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Получаем название товара из data-атрибута.
      const productName = button.dataset.product;

      // Запоминаем нажатую кнопку, чтобы позже показать её состояние.
      activeOrderButton = button;

      // Записываем название товара в скрытое поле формы.
      selectedProductInput.value = productName;

      // Открываем модальное окно.
      orderDialog.showModal();
    });
  });
}

// Закрываем модальное окно по кнопке «Закрыть».
if (orderDialog && closeDialogButton) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

// Обрабатываем отправку формы заявки (в модальном окне или на отдельной странице).
if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    // Отменяем стандартную отправку формы,
    // потому что backend пока не подключён.
    event.preventDefault();

    // Сбрасываем предыдущие признаки ошибок.
    const formElements = Array.from(orderForm.elements);

    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    // Проверяем встроенные HTML-ограничения формы.
    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });

      // Показываем стандартные сообщения браузера.
      orderForm.reportValidity();
      return;
    }

    // Показываем состояние отправки на кнопке формы.
    const submitButton = orderForm.querySelector('button[type="submit"]');
    const submitButtonText = submitButton ? submitButton.textContent : '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Отправляем...';
    }

    // Небольшая задержка, чтобы состояние отправки было видно.
    window.setTimeout(() => {
      // Показываем сообщение об успешной отправке.
      if (successMessage) {
        successMessage.hidden = false;
      }

      // Очищаем форму.
      orderForm.reset();

      // Закрываем модальное окно, если форма открыта в нём.
      if (orderDialog) {
        orderDialog.close();
      }

      // Возвращаем кнопке отправки обычный вид.
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitButtonText;
      }

      // Кнопка, по которой открыли окно, переходит в состояние «Заявка отправлена».
      if (activeOrderButton) {
        activeOrderButton.textContent = 'Заявка отправлена';
        activeOrderButton.classList.remove('button--primary');
        activeOrderButton.classList.add('button--success');
      }
    }, 600);
  });
}

// Кнопка «Добавить в избранное» переключается в состояние «В избранном».
const favoriteButton = document.querySelector('[data-favorite]');

if (favoriteButton) {
  favoriteButton.addEventListener('click', () => {
    const isFavorite = favoriteButton.classList.toggle('button--success');

    favoriteButton.textContent = isFavorite
      ? 'В избранном'
      : 'Добавить в избранное';
  });
}

// Кнопка «Наверх»: порог прокрутки, после которого она появляется.
const TO_TOP_THRESHOLD = 300;

if (toTopButton) {
  // Показываем или скрываем кнопку в зависимости от положения страницы.
  window.addEventListener('scroll', () => {
    toTopButton.classList.toggle('to-top--visible', window.scrollY > TO_TOP_THRESHOLD);
  });

  // Прокручиваем страницу к началу.
  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
