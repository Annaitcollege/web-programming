const sensors = [
    {
      id: "NS-01",
      district: "Галицький",
      location: "просп. Свободи, 14",
      noiseLevel: 52,
      status: "normal"
    },
    {
      id: "NS-02",
      district: "Франківський",
      location: "вул. Наукова, 8",
      noiseLevel: 68,
      status: "warning"
    },
    {
      id: "NS-03",
      district: "Шевченківський",
      location: "просп. Чорновола, 21",
      noiseLevel: 83,
      status: "critical"
    },
    {
      id: "NS-04",
      district: "Сихівський",
      location: "вул. Зелена, 102",
      noiseLevel: 49,
      status: "normal"
    },
    {
      id: "NS-05",
      district: "Личаківський",
      location: "вул. Пасічна, 30",
      noiseLevel: 71,
      status: "warning"
    },
    {
      id: "NS-06",
      district: "Залізничний",
      location: "вул. Городоцька, 155",
      noiseLevel: 86,
      status: "critical"
    }
  ];
  
  const sensorList = document.querySelector(".sensor-list");
  const districtFilter = document.querySelector("#district-filter");
  const criticalFilter = document.querySelector("#critical-filter");
  
  function createSensorCard(sensor) {
    const card = document.createElement("article");
    card.className = `sensor-card sensor-card--${sensor.status}`;
  
    card.innerHTML = `
      <div class="sensor-card__header">
        <h3 class="sensor-card__title">${sensor.id}</h3>
        <span class="sensor-status sensor-status--${sensor.status}">${sensor.status}</span>
      </div>
      <div class="sensor-card__info">
        <div class="sensor-card__row">
          <span class="icon">📍</span> ${sensor.district} район
        </div>
        <div class="sensor-card__row">
          <span class="icon">🏢</span> ${sensor.location}
        </div>
      </div>
      <div class="sensor-card__noise">
        <span class="icon">📊</span> Рівень шуму: <strong class="noise-value">${sensor.noiseLevel} дБ</strong>
      </div>
    `;
  
    return card;
  }
  
  function renderSensors(sensorArray) {
    sensorList.replaceChildren();
    sensorArray.forEach((sensor) => {
      sensorList.append(createSensorCard(sensor));
    });
  }
  
  function applyFilters() {
    const selectedDistrict = districtFilter.value;
    const criticalOnly = criticalFilter.checked;
  
    const filteredSensors = sensors.filter((sensor) => {
      const matchesDistrict =
        selectedDistrict === "all" || sensor.district === selectedDistrict;
      const matchesStatus =
        !criticalOnly || sensor.status === "critical";
  
      return matchesDistrict && matchesStatus;
    });
  
    renderSensors(filteredSensors);
  }
  
  districtFilter.addEventListener("change", applyFilters);
  criticalFilter.addEventListener("change", applyFilters);
  
  // Початковий рендер
  renderSensors(sensors);