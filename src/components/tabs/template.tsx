import {Tab} from "./_";
import {appendChild, h, removeElementChildren} from "../../utils"
import {Observable} from "rxjs";

interface RenderOptions {
  tabs$: Observable<Tab[]>
}

export function renderTabs({tabs$}: RenderOptions) {
  const wrapper = <div class="appbar__tabs"/>;

  tabs$.subscribe((tabs) => {
    console.log(tabs);
    const tabEls = tabs.map((tab) => {
      return (
        <div class="appbar__tab">
          <span>{tab.name}</span>
          <span class="w-2"/>
          {
            tab.closable ? <button class="tab__close-btn">
              <svg class="tab__close-btn--icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button> : null
          }
        </div>
      );
    })

    removeElementChildren(wrapper);
    appendChild(wrapper, tabEls);
  });

  return wrapper;
}
