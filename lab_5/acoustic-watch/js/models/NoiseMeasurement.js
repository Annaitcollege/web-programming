export class NoiseMeasurement {
  constructor(value, measuredAt = new Date()) {
    this.value = value;
    this.measuredAt = measuredAt;
  }

  // Перевірка коректності вимірювання
  isValid() {
    return Number.isFinite(this.value) && this.value >= 0 && this.value <= 200;
  }
}