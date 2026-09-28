const noiseLevels = [
  42, 55, 61, 78, 83, 67, 49, 72, 91, 58, 64, 76,
  53, 47, 88, 69, 74, 82, 95, 51, 71, -1, 85, 63,
  79, 39, 141, 86
];

const warningLevel = 70;
const criticalLevel = 85;
const minValidLevel = 30;
const maxValidLevel = 130;

const statusLabel = value => `Рівень: ${value} dB`;
const isAbove = (value, threshold) => value > threshold;

const isValidLevel = (level, min = minValidLevel, max = maxValidLevel) => 
  Number.isFinite(level) && level >= min && level <= max;

const countByCategory = function (data, warnLimit, critLimit, minValid, maxValid) {
  let safeCount = 0;
  let warnCount = 0;
  let critCount = 0;
  let invalidCount = 0;
  let totalSum = 0;
  let validCount = 0;

  for (const level of data) {
    if (!isValidLevel(level, minValid, maxValid)) {
      invalidCount++;
      continue;
    }

    validCount++;
    totalSum += level;

    if (level <= warnLimit) {
      safeCount++;
    } else if (level <= critLimit) {
      warnCount++;
    } else {
      critCount++;
    }
  }

  return {
    safeCount,
    warnCount,
    critCount,
    invalidCount,
    validCount,
    totalSum
  };
};