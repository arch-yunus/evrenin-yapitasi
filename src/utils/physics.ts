// Physical constants (SI units)
export const CONSTANTS = {
  c: 299792458, // Speed of light (m/s)
  G: 6.67430e-11, // Gravitational constant (m^3 kg^-1 s^-2)
  h: 6.62607015e-34, // Planck constant (J*s)
  hbar: 1.054571817e-34, // Reduced Planck constant (J*s)
  kB: 1.380649e-23, // Boltzmann constant (J/K)
  lP: 1.616255e-35, // Planck length (m)
  mP: 2.176434e-8, // Planck mass (kg)
  tP: 5.391247e-44, // Planck time (s)
  solarMass: 1.98847e30, // Mass of Sun (kg)
};

/**
 * Calculates Schwarzschild radius: r_s = 2GM / c^2
 */
export function calculateSchwarzschildRadius(massKg: number): number {
  return (2 * CONSTANTS.G * massKg) / (CONSTANTS.c ** 2);
}

/**
 * Calculates Event Horizon Area: A = 4 * pi * r_s^2
 */
export function calculateEventHorizonArea(massKg: number): number {
  const rs = calculateSchwarzschildRadius(massKg);
  return 4 * Math.PI * (rs ** 2);
}

/**
 * Calculates Bekenstein-Hawking Entropy: S = (k_B * c^3 * A) / (4 * G * hbar)
 * Information content in bits: I = A / (4 * l_P^2 * ln(2))
 */
export function calculateBlackHoleEntropy(massKg: number): {
  entropyJoulesPerKelvin: number;
  informationBits: number;
  planckPixels: number;
  hawkingTemperatureKelvin: number;
  evaporationTimeSeconds: number;
} {
  const area = calculateEventHorizonArea(massKg);
  const planckArea = CONSTANTS.lP ** 2;
  const planckPixels = area / planckArea;
  
  // Entropy in J/K
  const entropyJoulesPerKelvin = (CONSTANTS.kB * (CONSTANTS.c ** 3) * area) / (4 * CONSTANTS.G * CONSTANTS.hbar);
  
  // Information in bits (1 bit = ln(2) of entropy / k_B)
  const informationBits = entropyJoulesPerKelvin / (CONSTANTS.kB * Math.LN2);
  
  // Hawking Temperature: T_H = hbar * c^3 / (8 * pi * G * M * k_B)
  const hawkingTemperatureKelvin = (CONSTANTS.hbar * (CONSTANTS.c ** 3)) / (8 * Math.PI * CONSTANTS.G * massKg * CONSTANTS.kB);
  
  // Evaporation Time: t_evap = 5120 * pi * G^2 * M^3 / (hbar * c^4)
  const evaporationTimeSeconds = (5120 * Math.PI * (CONSTANTS.G ** 2) * (massKg ** 3)) / (CONSTANTS.hbar * (CONSTANTS.c ** 4));

  return {
    entropyJoulesPerKelvin,
    informationBits,
    planckPixels,
    hawkingTemperatureKelvin,
    evaporationTimeSeconds
  };
}

/**
 * Landauer Principle minimum energy required to erase 1 bit of information:
 * E_min = k_B * T * ln(2)
 */
export function calculateLandauerLimit(temperatureKelvin: number, bits: number = 1): number {
  return CONSTANTS.kB * temperatureKelvin * Math.LN2 * bits;
}

/**
 * Bostrom's Simulation Argument Trilemma:
 * P(Sim) = (f_p * N_I) / (f_p * N_I + 1)
 */
export function calculateSimulationProbability(fp: number, NI: number): number {
  if (fp === 0) return 0;
  const numerator = fp * NI;
  const denominator = numerator + 1;
  return denominator === 0 ? 0 : numerator / denominator;
}

/**
 * 1D Elementary Cellular Automata Rule Evaluator
 * Evaluates binary neighborhood [left, center, right] according to 8-bit rule number (0..255)
 */
export function evaluateWolframRule(rule: number, left: number, center: number, right: number): number {
  const index = (left << 2) | (center << 1) | right;
  return (rule >> index) & 1;
}

/**
 * Generate next generation of 1D cellular automaton
 */
export function stepWolfram1D(currentGen: number[], rule: number): number[] {
  const len = currentGen.length;
  const nextGen = new Array(len);
  for (let i = 0; i < len; i++) {
    const left = currentGen[(i - 1 + len) % len];
    const center = currentGen[i];
    const right = currentGen[(i + 1) % len];
    nextGen[i] = evaluateWolframRule(rule, left, center, right);
  }
  return nextGen;
}

/**
 * Format numbers into compact readable scientific or standard notation
 */
export function formatScientific(num: number, digits: number = 2): string {
  if (num === 0) return "0";
  if (Math.abs(num) >= 0.01 && Math.abs(num) < 1e6) {
    return num.toLocaleString('tr-TR', { maximumFractionDigits: digits });
  }
  const expStr = num.toExponential(digits);
  const [base, exp] = expStr.split('e');
  return `${base} × 10^${exp.replace('+', '')}`;
}
