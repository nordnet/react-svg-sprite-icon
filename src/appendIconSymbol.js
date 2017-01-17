
const isProbablyIE = !(typeof window === 'undefined') && !(typeof SVGElement === 'undefined') && !('innerHTML' in SVGElement.prototype);

function appendIconSymbol(id, icon, spriteId) {
  if (isProbablyIE) {
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = `<svg>${icon}</svg>`;
    const svg = svgContainer.firstChild;
    addToSprite(id, svg, spriteId);
  } else {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.innerHTML = icon;
    addToSprite(id, svg, spriteId);
  }
}

function addToSprite(id, svg, spriteId) {
  const symbol = svg.firstChild;
  symbol.setAttribute('id', id);
  symbol.removeAttribute('xmlns'); // TODO: This should probably be done in the loader
  document.querySelector(`svg#${ spriteId }`).appendChild(symbol);
}

export default appendIconSymbol;
