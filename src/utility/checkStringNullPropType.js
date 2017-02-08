export default function checkStringNullPropType(props, propName, componentName) {
  const prop = props[propName];

  if (prop !== null && typeof props !== 'string') {
    return new Error(`Invalid prop '${propName}' supplied to ${componentName}. Validation failed.`);
  }

  return null;
}
