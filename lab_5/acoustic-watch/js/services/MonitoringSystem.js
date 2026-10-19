import { NoiseSensor } from '../models/NoiseSensor.js';

export class MonitoringSystem {
  constructor() {
    this.sensors = []; // Колекція екземплярів NoiseSensor
  }

  // Додавання датчика з перевіркою дублікатів (Пункт 11.1)
  addSensor(sensor) {
    if (!(sensor instanceof NoiseSensor)) {
      throw new Error("Можна додавати лише об'єкти NoiseSensor");
    }
    if (this.sensors.some(s => s.id === sensor.id)) {
      throw new Error(`Датчик з ID ${sensor.id} вже існує`);
    }
    this.sensors.push(sensor);
  }

  // Пошук за ID
  findSensorById(id) {
    return this.sensors.find(sensor => sensor.id === id) || null;
  }

  // Фільтрація за районом
  getSensorsByDistrict(district) {
    return this.sensors.filter(sensor => sensor.district === district);
  }

  // Отримання критичних датчиків
  getCriticalSensors() {
    return this.sensors.filter(sensor => sensor.getStatus() === 'critical');
  }

  // Обчислення середнього рівня шуму (Пункт 14.1)
  getAverageNoiseLevel() {
    if (this.sensors.length === 0) return 0;
    const sum = this.sensors.reduce((acc, sensor) => acc + sensor.noiseLevel, 0);
    return Number((sum / this.sensors.length).toFixed(2));
  }
}