import {Observable} from "rxjs";
import {Tab} from "~/components/tabs";

interface RenderOptions {
  tabs$: Observable<Tab[]>
}

export function renderAppBar({tabs$}: RenderOptions) {

}
