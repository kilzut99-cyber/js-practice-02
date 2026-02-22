const RATE_USD = 3.25;
const RATE_EUR = 3.50;
const RATE_RUB = 0.035;

// --- ТЕМА (Авто и Кнопка) ---
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const hour = new Date().getHours();
  // Темная тема с 18:00 до 6:00
  let currentTheme = (hour >= 18 || hour < 6) ? 'dark' : 'light';

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) themeIcon.textContent = (theme === 'dark' ? '🌙' : '☀️');
  };

  applyTheme(currentTheme);
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = (currentTheme === 'dark' ? 'light' : 'dark');
      applyTheme(currentTheme);
    });
  }
}
document.addEventListener('DOMContentLoaded', initTheme);

// --- ЗАДАНИЕ 1: Валидация ---
function checkLogin() {
  const email = document.getElementById("user-email").value;
  const ageVal = document.getElementById("ageInput").value;
  const pass = document.getElementById("passInput").value;
  const res = document.getElementById("loginResult");

  res.style.color = "#e74c3c"; // Красный для ошибок

  if (!email.includes("@")) {
    res.textContent = "Ошибка: Email должен содержать @";
    return;
  }
  const age = Number(ageVal);
  if (ageVal.trim() === "" || Number.isNaN(age) || age < 18) {
    res.textContent = "Ошибка: Возраст должен быть числом >= 18";
    return;
  }
  if (pass.length < 6) {
    res.textContent = "Ошибка: Пароль слишком короткий";
    return;
  }

  res.style.color = "#27ae60"; // Зеленый для успеха
  res.textContent = "✅ Доступ разрешён";
}

// --- ЗАДАНИЕ 2: Скидки ---
function calculateDiscount() {
  const input = document.getElementById("sumInput");
  const res = document.getElementById("discountResult");
  const sum = Number(input.value);

  if (input.value.trim() === "" || Number.isNaN(sum) || sum < 0) {
    res.style.color = "#e74c3c";
    res.textContent = "Ошибка: введите корректную сумму";
    return;
  }

  let discount = (sum < 100) ? 0 : (sum <= 500) ? 10 : 20;
  const finalSum = sum * (1 - discount / 100);
  const delivery = finalSum > 200 ? "Доставка бесплатная" : "Доставка платная";

  res.style.color = "#27ae60"; // Зеленый по заданию
  res.textContent = `К оплате: ${finalSum.toFixed(2)} BYN (скидка ${discount}%). ${delivery}.`;
}

// --- ЗАДАНИЕ 3: Конвертер ---
function convertCurrency() {
  const amount = Number(document.getElementById("amountInput").value);
  const currency = document.getElementById("currencySelect").value;
  const res = document.getElementById("convertResult");

  if (amount <= 0 || Number.isNaN(amount)) {
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
  res.style.color = "var(--text-main)";
  res.textContent = `${amount} BYN = ${result.toFixed(2)} ${currency}`;
}

// --- ЗАДАНИЕ 4: Квиз ---
function startQuiz() {
  const res = document.getElementById("quizResult");
  let score = 0;

  const questions = [
    { q: "=== это строгое сравнение? (да/нет)", a: "да" },
    { q: "null это объект в JS? (да/нет)", a: "да" }
  ];

  for (let item of questions) {
    let ans = prompt(item.q);
    if (ans === null) {
      res.style.color = "#e74c3c"; // Красный при отмене
      res.textContent = "Квиз отменён";
      return;
    }
    if (ans.toLowerCase() === item.a) score++;
  }

  res.style.color = "#27ae60";
  res.textContent = `Ваш результат: ${score}/${questions.length}`;
}