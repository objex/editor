import {BehaviorSubject} from "rxjs";

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
  newlyAdd: boolean;
}


/*--------------------
 * Methods
 *--------------------*/

export function addTab(tab: Omit<Tab, 'id' | 'newlyAdd'>) {
  let _tab: Tab = {
    id: _counter++,
    newlyAdd: true,
    ...tab
  }
  tabs$.next([
    _tab,
    ...tabs$.getValue().map(e => {
      e.newlyAdd = false;
      return e;
    })
  ]);
}

export function closeTab(tabId: number) {
  tabs$.next(tabs$.getValue().filter(e => e.id !== tabId));
}
