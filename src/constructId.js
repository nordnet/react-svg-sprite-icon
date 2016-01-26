import kebabCase from 'lodash.kebabcase';

function constructId(attributes) {
  const attributesMap = ['fill', 'stroke', 'strokeWidth'];
  const invalidCharacters = /[|&;$%@#"<>()+,]/g;

  const modifiers = attributesMap.map(attribute => {
    const value = attributes[attribute];
    if (!value) return undefined;
    return `_${ kebabCase(attribute) }-${ value
      .replace(invalidCharacters, '')
      .replace(/\s/g, '-') }`;
  }).filter(value => !!value);

  return `icon_${ kebabCase(attributes.name) }${ modifiers.join('') }`.toLowerCase();
}

export default constructId;
