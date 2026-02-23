// Константы для Задания 3
const RATE_USD = 3.00;
const RATE_EUR = 3.4;
const RATE_RUB = 0.035;

// Вспомогательная функция для форматирования в десятичную степень
function formatToPower(num) {
  if (num === 0) return "0";
  // Преобразуем в экспоненциальный вид, например "1.23e+5"
  const exp = num.toExponential(2); 
  const [mantissa, exponent] = exp.split('e');
  // Убираем плюс из степени и преобразуем в красивый вид 1.23 * 10^5
  return `${mantissa} · 10<sup>${parseInt(exponent)}</sup>`;
}

// ЗАДАНИЕ 1: Валидация
function checkLogin() {
  const email = document.getElementById("user-email").value;
  const ageInput = document.getElementById("ageInput").value;
  const pass = document.getElementById("passInput").value;
  const res = document.getElementById("loginResult");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Проверка @ и точки

  res.style.color = "#e74c3c";

  if (!emailRegex.test(email)) {
    res.textContent = "Ошибка: Некорректный Email (нужна @ и точка)";
    return;
  }

  const age = Number(ageInput);
  if (ageInput.trim() === "" || Number.isNaN(age) || age < 18) {
    res.textContent = "Ошибка: Возраст должен быть числом >= 18";
    return;
  }

  if (pass.length < 6) {
    res.textContent = "Ошибка: Пароль мин. 6 символов";
    return;
  }

  res.style.color = "#27ae60";
  res.innerHTML = "✅ Доступ разрешён";
}

// ЗАДАНИЕ 2: Скидки (проверка < 0.01)
function calculateDiscount() {
  const sumInput = document.getElementById("sumInput");
  const res = document.getElementById("discountResult");
  const sum = Number(sumInput.value);

  // Ошибка если пусто, NaN или меньше 0.01 (включая 0.00001 и отрицательные)
  if (sumInput.value.trim() === "" || Number.isNaN(sum) || sum < 0.01) {
    res.style.color = "#e74c3c";
    res.textContent = "Ошибка: введите сумму от 0.01";
    return;
  }

  let discount = (sum < 100) ? 0 : (sum <= 500) ? 10 : 20;
  const finalSum = sum * (1 - discount / 100);
  const delivery = finalSum > 200 ? "Доставка бесплатная" : "Доставка платная";

  res.style.color = "#27ae60";
  res.textContent = `К оплате: ${finalSum.toFixed(2)} BYN (скидка ${discount}%). ${delivery}.`;
}

// ЗАДАНИЕ 3: Конвертер (Десятичные степени + Зеленый цвет)
function convertCurrency() {
  const amountInput = document.getElementById("amountInput").value;
  const currency = document.getElementById("currencySelect").value;
  const res = document.getElementById("convertResult");
  const amount = Number(amountInput);

  if (amountInput.trim() === "" || Number.isNaN(amount) || amount <= 0) {
    res.style.color = "#e74c3c";
    res.textContent = "Введите сумму больше 0";
    return;
  }

  let result = 0;
  switch (currency) {
    case "USD": result = amount / RATE_USD; break;
    case "EUR": result = amount / RATE_EUR; break;
    case "RUB": result = amount / RATE_RUB; break;
  }

  res.style.color = "#27ae60"; // Зеленый цвет результата
  // Используем innerHTML для отображения тега <sup> (степени)
  res.innerHTML = `${formatToPower(amount)} BYN = ${formatToPower(result)} ${currency}`;
}

// ЗАДАНИЕ 4: Квиз
function startQuiz() {
  const res = document.getElementById("quizResult");
  let score = 0;

  const q1 = prompt("Вопрос 1: Разница между == и === существует? (да/нет)");
  if (q1 === null) return (res.style.color = "#e74c3c", res.textContent = "Квиз отменён");
  if (q1.toLowerCase() === "да") score++;

  const q2 = prompt("Вопрос 2: Можно ли менять const? (да/нет)");
  if (q2 === null) return (res.style.color = "#e74c3c", res.textContent = "Квиз отменён");
  if (q2.toLowerCase() === "нет") score++;

  const q3 = prompt("Вопрос 3: Number('abc') это NaN? (да/нет)");
  if (q3 === null) return (res.style.color = "#e74c3c", res.textContent = "Квиз отменён");
  if (q3.toLowerCase() === "да") score++;

  res.style.color = "#27ae60";
  res.textContent = `Ваш результат: ${score}/3`;
}