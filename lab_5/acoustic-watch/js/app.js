import { NoiseSensor } from './models/NoiseSensor.js';
import { MonitoringSystem } from './services/MonitoringSystem.js';


const sensorsData = [
  { id: "NS-01", district: "Галицький", location: "просп. Свободи", noiseLevel: 58 },
  { id: "NS-02", district: "Франківський", location: "вул. Наукова", noiseLevel: 74 },
  { id: "NS-03", district: "Шевченківський", location: "просп. Чорновола", noiseLevel: 83 }
];


const system = new MonitoringSystem();

sensorsData.forEach(data => {
  system.addSensor(NoiseSensor.fromObject(data));
});

function renderSensorCard(sensor) {
  const card = document.createElement('div');
  const status = sensor.getStatus();
  
  card.className = `card metric-card ${status}`;
  card.innerHTML = `
    <span class="card-label">Датчик: ${sensor.id}</span>
    <strong class="card-value" style="margin: 8px 0; display: block;">${sensor.noiseLevel} dB</strong>
    <span class="card-subtext"><strong>Район:</strong> ${sensor.district}</span>
    <span class="card-subtext"><strong>Адреса:</strong> ${sensor.location}</span>
    <div style="margin-top: 10px;">
      <span class="status-tag ${status}">${status.toUpperCase()}</span>
    </div>
  `;
  return card;
}


function renderApp() {
  const container = document.getElementById('sensors-container');
  const avgElement = document.getElementById('avg-noise');

  if (!container) return;
  container.innerHTML = '';


  system.sensors.forEach(sensor => {
    container.appendChild(renderSensorCard(sensor));
  });


  if (avgElement) {
    avgElement.textContent = `${system.getAverageNoiseLevel()} dB`;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  renderApp();


  console.log('--- ЕКСПЕРИМЕНТ З PROTOTYPE ---');
  const s1 = system.findSensorById('NS-01');
  const s2 = system.findSensorById('NS-02');
  
  console.log('Чи спільний метод getStatus у двох екземплярів?:', s1.getStatus === s2.getStatus); 
  console.log('Чи є noiseLevel власною властивістю?:', Object.hasOwn(s1, 'noiseLevel')); 
  console.log('Чи є getStatus власною властивістю?:', Object.hasOwn(s1, 'getStatus')); 
  console.log('Середній рівень шуму системи:', system.getAverageNoiseLevel()); 
});