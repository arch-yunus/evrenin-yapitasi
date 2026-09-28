// Physics calculation engine
const CONSTANTS = {
  c: 299792458,
  G: 6.67430e-11,
  h: 6.62607015e-34,
  hbar: 1.054571817e-34,
  kB: 1.380649e-23,
  lP: 1.616255e-35,
  solarMass: 1.98847e30,
};

function calculateSchwarzschildRadius(massKg) {
  return (2 * CONSTANTS.G * massKg) / (CONSTANTS.c ** 2);
}

function calculateEventHorizonArea(massKg) {
  const rs = calculateSchwarzschildRadius(massKg);
  return 4 * Math.PI * (rs ** 2);
}

function calculateBlackHoleInfo(massKg) {
  const rs = calculateSchwarzschildRadius(massKg);
  const area = 4 * Math.PI * (rs ** 2);
  const planckArea = CONSTANTS.lP ** 2;
  const planckPixels = area / planckArea;
  const entropyJK = (CONSTANTS.kB * (CONSTANTS.c ** 3) * area) / (4 * CONSTANTS.G * CONSTANTS.hbar);
  const bits = entropyJK / (CONSTANTS.kB * Math.LN2);
  const gigabytes = bits / (8 * 1e9);
  const hawkingTempK = (CONSTANTS.hbar * (CONSTANTS.c ** 3)) / (8 * Math.PI * CONSTANTS.G * massKg * CONSTANTS.kB);
  const evapTimeSec = (5120 * Math.PI * (CONSTANTS.G ** 2) * (massKg ** 3)) / (CONSTANTS.hbar * (CONSTANTS.c ** 4));

  return {
    rs,
    area,
    planckPixels,
    entropyJK,
    bits,
    gigabytes,
    hawkingTempK,
    evapTimeSec
  };
}

function calculateLandauer(tempK, bits = 1) {
  return CONSTANTS.kB * tempK * Math.LN2 * bits;
}

function calculateBostromSimProb(fp, ni) {
  if (fp <= 0 || ni <= 0) return 0;
  const num = fp * ni;
  return num / (num + 1);
}

function evaluateWolfram(rule, left, center, right) {
  const idx = (left << 2) | (center << 1) | right;
  return (rule >> idx) & 1;
}

function formatSciNum(num, digits = 2) {
  if (num === 0) return "0";
  if (Math.abs(num) >= 0.01 && Math.abs(num) < 1e5) {
    return num.toLocaleString('tr-TR', { maximumFractionDigits: digits });
  }
  const exp = num.toExponential(digits);
  const [b, e] = exp.split('e');
  return `${b} × 10^${e.replace('+', '')}`;
}

window.PhysicsEngine = {
  CONSTANTS,
  calculateSchwarzschildRadius,
  calculateEventHorizonArea,
  calculateBlackHoleInfo,
  calculateLandauer,
  calculateBostromSimProb,
  evaluateWolfram,
  formatSciNum
};
