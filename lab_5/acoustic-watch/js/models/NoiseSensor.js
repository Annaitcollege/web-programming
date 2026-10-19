import { NoiseMeasurement } from './NoiseMeasurement.js';

// Централізоване бізнес-правило класифікації шуму (Пункт 9)
export const NOISE_LIMITS = Object.freeze({
  normalMax: 55,
  warningMax: 70,
});

export class NoiseSensor {
  constructor(id, district, location, noiseLevel) {
    this.id = id;
    this.district = district;
    this.location = location;
    this.noiseLevel = noiseLevel;
    this.measurements = []; // Історія вимірювань (композиція)
  }

  // Метод визначення статусу (знаходиться в prototype - Пункт 7)
  getStatus() {
    if (this.noiseLevel <= NOISE_LIMITS.normalMax) {
      return 'normal';
    }
    if (this.noiseLevel <= NOISE_LIMITS.warningMax) {
      return 'warning';
    }
    return 'critical';
  }

  // Додавання нових вимірювань (Пункт 11.2)
  addMeasurement(measurement) {
    if (!(measurement instanceof NoiseMeasurement)) {
      throw new Error("Очікується об'єкт NoiseMeasurement");
    }
    if (!measurement.isValid()) {
      throw new Error("Некоректне значення вимірювання");
    }
    this.measurements.push(measurement);
    this.noiseLevel = measurement.value; // Оновлюємо поточний рівень
  }

  // Оновлення рівню шуму за числом
  updateNoiseLevel(value) {
    if (!NoiseSensor.isValidNoiseLevel(value)) {
      throw new Error("Некоректне значення рівня шуму");
    }
    this.addMeasurement(new NoiseMeasurement(value));
  }

  // Static-метод (Пункт 10) — не потребує конкретного екземпляра
  static isValidNoiseLevel(value) {
    return Number.isFinite(value) && value >= 0 && value <= 200;
  }

  // Static-фабрика для створення з Plain Object (Пункт 10)
  static fromObject(data) {
    return new NoiseSensor(data.id, data.district, data.location, data.noiseLevel);
  }
}