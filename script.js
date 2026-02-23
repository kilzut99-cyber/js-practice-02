// Константы для Задания 3
const RATE_USD = 3.00;
const RATE_EUR = 3.4;
const RATE_RUB = 0.035;

// Вспомогательная функция для умного форматирования чисел
function smartFormat(num) {
  // Если число больше или равно 100 миллиардам — выводим в степенях
  if (Math.abs(num) >= 100000000000) {
    const exp = num.toExponential(2);
    const [mantissa, exponent] = exp.split('e');
    return `${mantissa} · 10<sup>${parseInt(exponent)}</sup>`;
  }
  
  // В обычном случае выводим с разделением разрядов и запятой (плавающая точка)
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

// ЗАДАНИЕ 1: Валидация
function checkLogin() {
  const email = document.getElementById("user-email").value;
  const ageVal = document.getElementById("ageInput").value;
  const pass = document.getElementById("passInput").value;
  const res = document.getElementById("loginResult");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  res.style.color = "#e74c3c";

  if (!emailRegex.test(email)) {
    res.textContent = "Ошибка: Некорректный Email (нужна @ и точка)";
    return;
  }
  const age = Number(ageVal);
  if (ageVal.trim() === "" || Number.isNaN(age) || age < 18) {
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

// ЗАДАНИЕ 2: Скидки
function calculateDiscount() {
  const input = document.getElementById("sumInput");
  const res = document.getElementById("discountResult");
  const sum = Number(input.value);

  // Проверка: пусто, NaN или меньше 0.01 (включая 0.0001 и отрицательные)
  if (input.value.trim() === "" || Number.isNaN(sum) || sum < 0.01) {
    res.style.color = "#e74c3c";
    res.textContent = "Ошибка: введите сумму от 0.01";
    return;
  }

  let discount = (sum < 100) ? 0 : (sum <= 500) ? 10 : 20;
  const finalSum = sum * (1 - discount / 100);
  const delivery = finalSum > 200 ? "Доставка бесплатная" : "Доставка платная";

  res.style.color = "#27ae60";
  res.innerHTML = `К оплате: ${smartFormat(finalSum)} BYN (скидка ${discount}%). ${delivery}.`;
}

// ЗАДАНИЕ 3: Конвертер (с порогом для степеней)
function convertCurrency() {
  const input = document.getElementById("amountInput");
  const currency = document.getElementById("currencySelect").value;
  const res = document.getElementById("convertResult");
  const amount = Number(input.value);

  // Такая же проверка на дробные числа < 0.01 и отрицательные
  if (input.value.trim() === "" || Number.isNaN(amount) || amount < 0.01) {
    res.style.color = "#e74c3c";
    res.textContent = "Ошибка: введите сумму от 0.01";
    return;
  }

  let result = 0;
  switch (currency) {
    case "USD": result = amount / RATE_USD; break;
    case "EUR": result = amount / RATE_EUR; break;
    case "RUB": result = amount / RATE_RUB; break;
  }

  res.style.color = "#27ae60";
  // Используем smartFormat для вывода обычного числа или степени
  res.innerHTML = `${smartFormat(amount)} BYN = ${smartFormat(result)} ${currency}`;
}

// ЗАДАНИЕ 4: Квиз
function startQuiz() {
  const res = document.getElementById("quizResult");
  let score = 0;
  const check = (val) => {
    if (val === null) {
      res.style.color = "#e74c3c";
      res.textContent = "Квиз отменён";
      return true;
    }
    return false;
  };

  let q1 = prompt("Вопрос 1: Разница между == и === существует? (да/нет)");
  if (check(q1)) return;
  if (q1.toLowerCase() === "да") score++;

  let q2 = prompt("Вопрос 2: Можно ли менять const? (да/нет)");
  if (check(q2)) return;
  if (q2.toLowerCase() === "нет") score++;

  let q3 = prompt("Вопрос 3: Number('abc') это NaN? (да/нет)");
  if (check(q3)) return;
  if (q3.toLowerCase() === "да") score++;

  res.style.color = "#27ae60";
  res.textContent = `Ваш результат: ${score}/3`;
}