function createSvgSprite(spriteId) {
  const attributes = {
    id: spriteId,
    style: 'display: none;',
  };

  const svgIconContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  Object.keys(attributes).forEach(key => {
    svgIconContainer.setAttribute(key, attributes[key]);
  });

  document.body.appendChild(svgIconContainer);
}

export default createSvgSprite;
