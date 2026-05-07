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
