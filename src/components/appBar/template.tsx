import {Observable} from "rxjs";
import {renderTabs, Tab} from "../tabs";
import {h} from "../../utils"
import {renderThemeSelector} from "../themeSelector";

interface RenderOptions {
  tabs$: Observable<Tab[]>
}

export function renderAppBar({tabs$}: RenderOptions) {
  return (
    <div class="appbar">
      <div class="w-20" />
      {renderTabs({tabs$})}
      <div class="flex-1"/>
      {renderThemeSelector()}
    </div>
  )
}
