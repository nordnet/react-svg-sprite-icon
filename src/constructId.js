import kebabCase from 'lodash/string/kebabCase';

function constructId(attributes) {
  const attributesMap = ['fill', 'stroke', 'strokeWidth'];
  const invalidCharacters = /[|&;$%@#"<>()+,]/g;

  const id = attributesMap.map(attribute => {
    const value = attributes[attribute];
    if (!value) return undefined;
    return `_${ kebabCase(attribute) }-${ value.replace(invalidCharacters, '').replace(/\s/g, '-') }`;
  }).filter(value => !!value);

  return `icon_${ kebabCase(attributes.name) }${ id.join('') }`.toLowerCase();
}

export default constructId;
