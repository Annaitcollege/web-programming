
const noiseLevels = [
  42, 55, 61, 78, 83, 67, 49, 72, 91, 58, 64, 76,
  53, 47, 88, 69, 74, 82, 95, 51, 71, -1, 85, 63,
  79, 39, 141, 86
];

const warningLevel = 70;
const criticalLevel = 85;
const minValidLevel = 30;
const maxValidLevel = 130;


console.warn(`Поріг ${warningLevel} dB перевищено у вимірюваннях.`);
console.error("Некоректні дані у вхідному масиві.");





function isValidLevel(level, min = minValidLevel, max = maxValidLevel) {
  return typeof level === 'number' && Number.isFinite(level) && level >= min && level <= max;
}


const isAboveThreshold = (value, threshold) => value > threshold;
const formatDb = value => `${value} dB`;


function findFirstCritical(data, limit) {
  for (let i = 0; i < data.length; i++) {
    const level = data[i];
    if (isValidLevel(level) && isAboveThreshold(level, limit)) {
      return { value: level, index: i + 1 }; 
    }
  }
  return null;
}


const findRecovery = function(data, startIndex, warnLimit) {
  let i = startIndex; 
  let safeCount = 0;

  while (i < data.length) {
    const level = data[i];
    if (isValidLevel(level)) {
      if (level <= warnLimit) {
        safeCount++;
        if (safeCount === 3) {
          return { index: i + 1, value: level };
        }
      } else {
        safeCount = 0; 
      }
    }
    i++;
  }
  return null;
};


const findFirstValid = function(data) {
  if (!data || data.length === 0) return null;
  let i = 0;

  do {
    if (isValidLevel(data[i])) {
      return { index: i + 1, value: data[i] };
    }
    i++;
  } while (i < data.length);

  return null;
};



function generateMonitoringReport(data) {
  let validCount = 0;
  let invalidCount = 0;
  let sumValid = 0;
  let minNoise = null;
  let maxNoise = null;

  let normalCount = 0;   
  let warningCount = 0; 
  let criticalCount = 0; 

  const invalidEntries = [];

  
  let position = 0;
  for (const level of data) {
    position++;
    if (!isValidLevel(level)) {
      invalidCount++;
      invalidEntries.push(`позиція ${position} (${level} dB)`);
      continue;
    }

    validCount++;
    sumValid += level;

    if (minNoise === null || level < minNoise) minNoise = level;
    if (maxNoise === null || level > maxNoise) maxNoise = level;

    if (level <= warningLevel) {
      normalCount++;
    } else if (level <= criticalLevel) {
      warningCount++;
    } else {
      criticalCount++;
    }
  }

  
  const avgNoise = validCount > 0 ? (sumValid / validCount).toFixed(2).replace('.', ',') : null;

  
  const firstCritical = findFirstCritical(data, criticalLevel);
  const recovery = firstCritical ? findRecovery(data, firstCritical.index, warningLevel) : null;

  
  console.group('Акустична варта -- звіт моніторингу');

  console.log(`Пороги: попередження > ${warningLevel} dB; критичний рівень > ${criticalLevel} dB`);
  console.log('');
  console.log(`Усього вимірювань: ${data.length}`);
  console.log(`Коректних: ${validCount}`);
  console.log(`Некоректних: ${invalidCount}`);
  console.log('');


console.log('Категорія              Кількість');
console.log(`Без перевищення        ${normalCount}`);
console.log(`Попередження           ${warningCount}`);
console.log(`Критичні               ${criticalCount}`);

  console.log('');
  console.log(`Середній рівень: ${avgNoise} dB`);
  console.log(`Мінімальний рівень: ${formatDb(minNoise)}`);
  console.log(`Максимальний рівень: ${formatDb(maxNoise)}`);

  if (firstCritical) {
    console.log(`Перше критичне вимірювання: ${formatDb(firstCritical.value)}, позиція ${firstCritical.index}`);
  } else {
    console.log('Перше критичне вимірювання: не виявлено');
  }

  if (recovery) {
    console.log(`Відновлення -- три безпечні вимірювання поспіль: позиція ${recovery.index}`);
  } else {
    console.log('Відновлення -- три безпечні вимірювання поспіль: не знайдено');
  }

  console.log('');
  console.log(`Поріг ${warningLevel} dB перевищено у ${warningCount + criticalCount} вимірюваннях.`);
  console.log(`Некоректні дані: ${invalidEntries.join(', ')}.`);

  console.log('');
  console.log(`Висновок: зафіксовано ${criticalCount} критичні вимірювання;`);
  console.log(
    recovery 
      ? `стійке відновлення зафіксовано на позиції ${recovery.index}.` 
      : 'після першого з них стійкого відновлення не виявлено.'
  );

  console.groupEnd();
}


generateMonitoringReport(noiseLevels);