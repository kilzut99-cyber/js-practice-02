// Константы для Задания 3 (Конвертер)
const RATE_USD = 3.25;
const RATE_EUR = 3.5;
const RATE_RUB = 0.035; // курс за 1 RUB

// ЗАДАНИЕ 1: Валидация "Вход в систему"
function checkLogin() {
  // Читаем значения ИЗ ПОЛЕЙ в момент вызова функции
  const email = document.getElementById("user-email").value;
  const ageInput = document.getElementById("ageInput").value;
  const pass = document.getElementById("passInput").value;
  const res = document.getElementById("loginResult");

  // Сброс стиля текста на красный для ошибок, простейший способ выполнения требования "введите красным"
  res.style.color = "#e74c3c";

  // а) Проверка email: должен содержать символ @
  if (!email.includes("@")) {
    res.textContent = "Ошибка: Email должен содержать символ @";
    return; // используется Early Return
  }

  // б) Проверка возраста: число и >= 18
  const age = Number(ageInput);
  if (ageInput.trim() === "" || Number.isNaN(age) || age < 18) {
    res.textContent = "Ошибка: Возраст должен быть числом и не менее 18 лет";
    return; // используется Early Return
  }

  // в) Проверка пароля: длина не менее 6 символов
  if (pass.length < 6) {
    res.textContent = "Ошибка: Пароль должен содержать не менее 6 символов";
    return; // используется Early Return
  }

  // Если всё корректно, то зеленым цветом и эмодзи-символ
  res.style.color = "#27ae60"; // Зеленый для успеха
  res.textContent = "✅ Доступ разрешён";
}

// ЗАДАНИЕ 2: Скидки
function calculateDiscount() {
  const sumInput = document.getElementById("sumInput");
  const res = document.getElementById("discountResult");
  const sum = Number(sumInput.value);

  // Проверка на пустой ввод или некорректное число
  if (sumInput.value.trim() === "" || Number.isNaN(sum) || sum < 0) {
    res.style.color = "red";
    res.textContent = "Ошибка: введите корректную сумму";
    return;
  }

  let discount = 0;
  // Скидка по правилам (else if)
  if (sum < 100) {
    discount = 0;
  } else if (sum >= 100 && sum <= 500) {
    discount = 10;
  } else if (sum > 500) {
    discount = 20;
  }

  const finalSum = sum * (1 - discount / 100);
  // Тернарный оператор для доставки
  const deliveryStatus =
    finalSum > 200 ? "Доставка бесплатная" : "Доставка платная";
  res.style.color = "#27ae60";
  res.textContent = `К оплате: ${finalSum.toFixed(2)} BYN (скидка ${discount}%). ${deliveryStatus}.`;
}

// ЗАДАНИЕ 3: Конвертер валют (switch)
function convertCurrency() {
  const amount = Number(document.getElementById("amountInput").value);
  const currency = document.getElementById("currencySelect").value;
  const res = document.getElementById("convertResult");

  if (Number.isNaN(amount) || amount <= 0) {
    res.textContent = "Введите сумму больше 0";
    res.classList.add("error");
    return;
  }

  let result = 0;
  // Использование switch
  switch (currency) {
    case "USD":
      result = amount / RATE_USD;
      break;
    case "EUR":
      result = amount / RATE_EUR;
      break;
    case "RUB":
      result = amount / RATE_RUB;
      break;
    default:
      res.textContent = "Валюта не выбрана";
      return;
  }

  res.className = "result";
  // Округление до 2 знаков
  res.textContent = `${amount} BYN = ${result.toFixed(2)} ${currency}`;
}

// ЗАДАНИЕ 4: Мини-квиз (if/else + аккуратная обработка ввода)
function startQuiz() {
  const res = document.getElementById("quizResult");
  let score = 0;

  // Вопросы через prompt
  const q1 = prompt("Вопрос 1: Разница между == и === в строгом сравнении? (да/нет)");
  if (q1 === null) {
    res.style.color = "#e74c3c"; // Красный при отмене
    res.textContent = "Квиз отменён";
    return;
  }
  if (q1.toLowerCase() === "да") score++;

  const q2 = prompt("Вопрос 2: Можно ли изменить значение const? (да/нет)");
  if (q2 === null) {
    res.style.color = "#e74c3c"; // Красный при отмене
    res.textContent = "Квиз отменён";
    return;
  }
  if (q2.toLowerCase() === "нет") score++;

  const q3 = prompt("Вопрос 3: Функция Number('abc') вернет NaN? (да/нет)");
  if (q2 === null) {
    res.style.color = "#e74c3c"; // Красный при отмене
    res.textContent = "Квиз отменён";
    return;
  }
  if (q3.toLowerCase() === "да") score++;
  res.style.color = "#27ae60";
  res.textContent = `Ваш результат: ${score}/3`;
}
