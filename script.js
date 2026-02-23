// Константы для Задания 3 (Конвертер)
const RATE_USD = 3.00;
const RATE_EUR = 3.4;
const RATE_RUB = 0.035; // курс за 1 RUB

// ЗАДАНИЕ 1: Валидация "Вход в систему"
function checkLogin() {
  const email = document.getElementById("user-email").value;
  const ageInput = document.getElementById("ageInput").value;
  const pass = document.getElementById("passInput").value;
  const res = document.getElementById("loginResult");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  res.style.color = "#e74c3c"; // Красный для ошибок

  if (!email.includes("@")) {
    res.textContent = "Ошибка: Email должен содержать символ @";
    return;
  }
  if (!emailRegex.test(email)) {
    res.textContent = "Ошибка: Некорректный формат (нужна точка и домен)";
    return;
  }

  const age = Number(ageInput);
  if (ageInput.trim() === "" || Number.isNaN(age) || age < 18) {
    res.textContent = "Ошибка: Возраст должен быть числом и не менее 18 лет";
    return;
  }

  if (pass.length < 6) {
    res.textContent = "Ошибка: Пароль должен содержать не менее 6 символов";
    return;
  }

  res.style.color = "#27ae60"; // Зеленый для успеха
  res.textContent = "✅ Доступ разрешён";
}

// ЗАДАНИЕ 2: Скидки (ИСПРАВЛЕНО: проверка на сверхмалые дробные числа)
function calculateDiscount() {
  const sumInput = document.getElementById("sumInput");
  const res = document.getElementById("discountResult");
  const sum = Number(sumInput.value);

  // ИСПРАВЛЕНО: Добавлена проверка на дробные числа меньше 0.01 (например 0.00001)
  if (sumInput.value.trim() === "" || Number.isNaN(sum) || sum < 0.01) {
    res.style.color = "#e74c3c"; 
    res.textContent = "Ошибка: введите корректную сумму (минимум 0.01)";
    return;
  }

  let discount = 0;
  if (sum < 100) {
    discount = 0;
  } else if (sum <= 500) {
    discount = 10;
  } else {
    discount = 20;
  }

  const finalSum = sum * (1 - discount / 100);
  const deliveryStatus = finalSum > 200 ? "Доставка бесплатная" : "Доставка платная";

  res.style.color = "#27ae60"; // Зеленый для успеха
  res.textContent = `К оплате: ${finalSum.toFixed(2)} BYN (скидка ${discount}%). ${deliveryStatus}.`;
}

// ЗАДАНИЕ 3: Конвертер (ИСПРАВЛЕНО: зеленый шрифт результата)
function convertCurrency() {
  const amountInput = document.getElementById("amountInput").value;
  const currency = document.getElementById("currencySelect").value;
  const res = document.getElementById("convertResult");
  const amount = Number(amountInput);

  // Валидация
  if (amountInput.trim() === "" || Number.isNaN(amount) || amount <= 0) {
    res.style.color = "#e74c3c";
    res.textContent = "Введите сумму больше 0";
    return;
  }

  // Расчет
  let result = 0;
  switch (currency) {
    case "USD": result = amount / RATE_USD; break;
    case "EUR": result = amount / RATE_EUR; break;
    case "RUB": result = amount / RATE_RUB; break;
    default: return;
  }

  const formatter = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // ИСПРАВЛЕНО: Шрифт зеленого цвета для результата конвертации
  res.style.color = "#27ae60"; 
  res.textContent = `${formatter.format(amount)} BYN = ${formatter.format(result)} ${currency}`;
}

// ЗАДАНИЕ 4: Мини-квиз
function startQuiz() {
  const res = document.getElementById("quizResult");
  let score = 0;

  const q1 = prompt("Вопрос 1: Разница между == и === в строгом сравнении? (да/нет)");
  if (q1 === null) {
    res.style.color = "#e74c3c";
    res.textContent = "Квиз отменён";
    return;
  }
  if (q1.toLowerCase() === "да") score++;

  const q2 = prompt("Вопрос 2: Можно ли изменить значение const? (да/нет)");
  if (q2 === null) {
    res.style.color = "#e74c3c";
    res.textContent = "Квиз отменён";
    return;
  }
  if (q2.toLowerCase() === "нет") score++;

  const q3 = prompt("Вопрос 3: Функция Number('abc') вернет NaN? (да/нет)");
  if (q3 === null) {
    res.style.color = "#e74c3c";
    res.textContent = "Квиз отменён";
    return;
  }
  if (q3.toLowerCase() === "да") score++;

  res.style.color = "#27ae60";
  res.textContent = `Ваш результат: ${score}/3`;
}