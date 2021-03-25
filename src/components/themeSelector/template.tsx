import {h} from "../../utils"
import {Subject} from "rxjs";

export function renderThemeSelector() {
  const show$ = new Subject();
  let x = false;

  const button = (
    <button class="theme-selector__btn">
      <span>Theme</span>
      <svg class="theme-selector__btn--icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
  );

  const dropDown = (
    <div
      x-show={show$}
      x-transition:enter="transition ease-out duration-100"
      x-transition:enter-start="transform opacity-0 scale-95"
      x-transition:enter-end="transform opacity-100 scale-100"
      x-transition:leave="transition ease-in duration-75"
      x-transition:leave-start="transform opacity-100 scale-100"
      x-transition:leave-end="transform opacity-0 scale-95"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <div class="py-1" role="none">
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Account settings</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Support</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">License</a>
      </div>
    </div>
  );

  show$.next(x);
  button.addEventListener('click', () => {
    show$.next(!x);
  })

  return <div class="theme-selector__wrapper">
    {button}
    {dropDown}
  </div>
}
