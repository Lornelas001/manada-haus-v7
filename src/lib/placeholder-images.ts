// Placeholder images as data URIs (replace with real imports in production)
function makePlaceholder(bg: string, emoji: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
    <rect width='400' height='400' fill='${bg}'/>
    <text x='200' y='240' text-anchor='middle' font-size='120' font-family='serif'>${emoji}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

export const sampleRaincoat1 = makePlaceholder('#dbeafe', '🧥');
export const sampleRaincoat2 = makePlaceholder('#bfdbfe', '🌧️');
export const sampleRaincoat3 = makePlaceholder('#eff6ff', '☔');
export const sampleCollar    = makePlaceholder('#fef3c7', '📿');
export const sampleSweater   = makePlaceholder('#f0fdf4', '🧶');
export const sampleHarness   = makePlaceholder('#fce7f3', '🦺');
export const sampleBowtie    = makePlaceholder('#ede9fe', '🎀');

// Placeholders temporales para productos nuevos del catálogo de WhatsApp
// (aún no tienen foto real subida — reemplazar en cuanto se tenga la imagen)
export const sampleJerseyVerde    = makePlaceholder('#dcfce7', '⚽');
export const sampleGabardinaCafe  = makePlaceholder('#e7d7c9', '🧥');
export const sampleGabardinaRosa  = makePlaceholder('#fbcfe8', '🧥');
export const sampleGabardinaAzul  = makePlaceholder('#bfdbfe', '🧥');
export const sampleHoodieLila     = makePlaceholder('#e9d5ff', '🥶');
export const sampleHoodieAzul2    = makePlaceholder('#bae6fd', '🥶');
export const sampleHoodieNegra    = makePlaceholder('#d1d5db', '🥶');
export const samplePlayeraPolo    = makePlaceholder('#fef9c3', '🎀');
