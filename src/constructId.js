import kebabCase from 'lodash.kebabcase';

function constructId(attributes) {
  const attributesMap = ['fill', 'stroke', 'strokeWidth'];

  const modifiers = attributesMap
    .map(mapAttributes(attributes))
    .filter(value => !!value);

  return `icon_${ kebabCase(attributes.name) }${ modifiers.join('') }`.toLowerCase();
}

function mapAttributes(attributes) {
  return function mapAttributesWithValue(attribute) {
    const value = attributes[attribute];

    if (!value) {
      return undefined;
    }

    return `_${ kebabCase(attribute) }-${ value
      .replace(/[|&;$%@#"<>()+,]/g, '')
      .replace(/\s/g, '-') }`;
  };
}

export default constructId;
