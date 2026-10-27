// 1. Посилання на MockAPI endpoint
const API_URL = "https://6ae0c4dbbe3bc8fead97e3a8.mockapi.io/api/v1/sensors";

// 2. Функція для відображення карток у DOM (рендеринг)
function renderSensors(sensors) {
  const container = document.querySelector("#sensors-list");
  if (!container) return; // Перевірка наявності контейнера
  
  container.innerHTML = ""; // Очищення перед виводом

  sensors.forEach((sensor) => {
    const card = document.createElement("article");
    card.classList.add("sensor-card");
    
    card.innerHTML = `
      <h3>${sensor.name}</h3>
      <p>Район: ${sensor.district}</p>
      <p>Рівень шуму: ${sensor.noiseLevel} дБ</p>
      <p>Статус: <span class="status--${sensor.status}">${sensor.status}</span></p>
    `;
    
    container.append(card);
  });
}

// 3. Асинхронна функція для завантаження даних із сервера
async function loadSensors() {
  try {
    const response = await fetch(API_URL);

    // Перевірка успішності HTTP-відповіді (статуси 200-299)
    if (!response.ok) {
      throw new Error(`Помилка HTTP: ${response.status}`);
    }

    // Зчитування та конвертація JSON у JS-масив
    const sensors = await response.json();

    // Передача отриманих даних у функцію відображення
    renderSensors(sensors);
  } catch (error) {
    console.error("Не вдалося завантажити сенсори:", error);
    
    const container = document.querySelector("#sensors-list");
    if (container) {
      container.innerHTML = "<p class='error-message'>Не вдалося завантажити дані сенсорів. Спробуйте пізніше.</p>";
    }
  }
}

// 4. Виклики завантаження після відкриття сторінки
loadSensors();


function renderSensors(sensors) {
    const container = document.querySelector("#sensors-list");
    if (!container) return;
  
    container.innerHTML = "";
  
    sensors.forEach((sensor) => {
      const card = document.createElement("article");
      card.className = `sensor-card sensor-card--${sensor.status}`;
      
      card.innerHTML = `
        <div class="sensor-card__header">
          <h3 class="sensor-card__title">${sensor.name}</h3>
          <span class="sensor-status sensor-status--${sensor.status}">${sensor.status}</span>
        </div>
        <div class="sensor-card__info">
          <p>📍 ${sensor.district} район</p>
          <p>📊 Рівень шуму: <strong>${sensor.noiseLevel} дБ</strong></p>
        </div>
      `;
      
      container.append(card);
    });
  }