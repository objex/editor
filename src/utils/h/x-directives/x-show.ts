import {Subscribable} from "rxjs";
import {showElement} from "../../../browser";
import {transitionIn, transitionOut} from "./x-transition";

export interface XShowAttributes {
  'x-show'?: Subscribable<boolean>;
}

export function mountXShow(el: HTMLElement | SVGElement, value: Subscribable<boolean>) {
  // TODO: unsubscribe on element destroyed
  value.subscribe(async (val) => {
    if (val && (el.style.display === 'none' || (el as any).__x_transition)) {
      try {
        await transitionIn(el);
      } catch (e) {
      } finally {
        showElement(el);
      }
    } else if (el.style.display !== 'none') {
      try {
        await transitionOut(el);
      } catch (e) {
      } finally {
        el.style.display = 'none';
      }
    }
  })
}
