import {Tab} from "~/components/tabs/_";
import {h} from "~/utils"
import {Observable} from "rxjs";

interface RenderOptions {
  tabs$: Observable<Tab[]>
}

export function renderTabs({tabs$}: RenderOptions) {
  return <div />;
}
