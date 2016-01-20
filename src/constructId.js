import kebabCase from 'lodash/string/kebabCase';

function constructId(attributes) {
  const attributesMap = ['fill', 'stroke', 'strokeWidth'];
  const invalidCharacters = /[|&;$%@#"<>()+,]/g;

  const id = attributesMap.reduce((string, attribute) => {
    const value = attributes[attribute];

    if (value) {
      return `${ string }_${ kebabCase(attribute) }-${ value.replace(invalidCharacters, '').replace(/\s/g, '-') }`;
    }

    return string;
  }, `icon_${ kebabCase(attributes.name) }`);

  return id.toLowerCase();
}

export default constructId;
