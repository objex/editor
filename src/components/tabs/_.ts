import {BehaviorSubject, Observable} from "rxjs";

/*------------------
 * Internals
 *------------------*/

const tabs$ = new BehaviorSubject<Tab[]>([]);
let _counter = 1;

/*------------------
 * Types
 *------------------*/

export interface Tab {
  id: number;
  name: string;
  closable: boolean;
}


/*--------------------
 * Methods
 *--------------------*/

export function addTab(tab: Omit<Tab, 'id'>) {
  let _tab: Tab = {
    id: _counter++,
    ...tab
  }
  tabs$.next([
    _tab,
    ...tabs$.getValue()
  ]);
}

export function closeTab(tabId: number) {
  tabs$.next(tabs$.getValue().filter(e => e.id !== tabId));
}

export function mountTabs(): Observable<Tab[]> {
  return tabs$.pipe();
}
