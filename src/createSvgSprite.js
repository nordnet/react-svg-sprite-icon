function createSvgSprite(spriteId) {
  if (document.querySelector(`svg#${ spriteId }`)) return;

  const attributes = [
    ['id', spriteId],
    ['style', 'display: none;'],
  ];

  const svgIconContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  attributes.forEach((attribute) => {
    svgIconContainer.setAttribute(attribute[0], attribute[1]);
  });

  document.body.appendChild(svgIconContainer);
}

export default createSvgSprite;
