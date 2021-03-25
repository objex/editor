export interface Directive {
  type: string;
  value?: string;
  modifiers?: string[];
  expression: string;
}

/**
 * parse attribute value
 */
function parseHtmlAttribute({name, value}: Attr): Directive {

  const normalizedType = name
    .replace('x-', '')
    .split(':')[0]
    .split('.')[0];
  const valueMatch = name.match(/:([a-zA-Z0-9\-:]+)/)
  const modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || []

  return {
    type: normalizedType,
    value: valueMatch ? valueMatch[1] : null,
    modifiers: modifiers.map(i => i.replace('.', '')),
    expression: value,
  }
}

/**
 * get x- attributes of given element
 * @param el
 * @param type filter attributes based on given type
 */
export function getXAttrs(el: HTMLElement | SVGElement, type: string): Directive[] {
  let directives = Array.from(el.attributes)
    .filter((attr) => attr.name.startsWith('x-'))
    .map(parseHtmlAttribute)
  if (type) return directives.filter(i => i.type === type)
  return directives;
}
