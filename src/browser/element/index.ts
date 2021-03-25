/**
 * Retrieve the currently active element
 *
 * @returns Element or nothing
 */
export function getActiveElement(): HTMLElement | undefined {
  return document.activeElement instanceof HTMLElement
    ? document.activeElement
    : undefined
}


/**
 * Removes display none of given element
 */
export function showElement(el: HTMLElement | SVGElement) {
  if (el.style.length === 1 && el.style.display === 'none') {
    el.removeAttribute('style')
  } else {
    el.style.removeProperty('display')
  }
}
