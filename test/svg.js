module.exports = function(options) {
  const config = options || {};
  const info = {
    minX: 0,
    minY: 0,
    width: 10,
    height: 8,
    modeStrokeWidth: 2,
  };
  const strokeWidthDifference = config.strokeWidth > 0 ? info.modeStrokeWidth - config.strokeWidth : 0;
  const result = {
    data: '<' + (config.rootElement || 'svg') + ' ' + 'viewBox="' + (0 - (strokeWidthDifference / -2)) + ' ' + (0 - (strokeWidthDifference / -2)) + ' ' + (10 - strokeWidthDifference) + ' ' + (8 - strokeWidthDifference) + '" xmlns="http://www.w3.org/2000/svg"><path d="M.7 3.44l3 3L9.3.84" stroke="' + (config.stroke || '#00BD76') + '" stroke-width="' + (config.strokeWidth || '2') + '" fill="none" fill-rule="evenodd"/>' + '</' + (config.rootElement || 'svg') + '>',
  };
  if (strokeWidthDifference !== 0) {
    result.originalInfo = info;
    result.info = {};
    result.info.minX = result.originalInfo.minX - (strokeWidthDifference / -2);
    result.info.minY = result.originalInfo.minY - (strokeWidthDifference / -2);
    result.info.width = result.originalInfo.width - strokeWidthDifference;
    result.info.height = result.originalInfo.height - strokeWidthDifference;
  } else {
    result.info = info;
  }
  return result;
}
