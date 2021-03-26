import {h} from "../../utils"
import {addTab, mountTabs} from "../tabs";
import {renderAppBar} from "../appBar";
import {renderToolbar} from "../toolbar";

const tabs$ = mountTabs();
tabs$.subscribe();
addTab({name: "Home", closable: false});

export function renderApp() {
  let editorEl = <div style="height: calc(100vh - 84px)"/>;
  let previewEl = <div class="w-full scroll-auto"/>;

  (window as any).editorEl = editorEl;
  (window as any).previewEl = previewEl;

  return (
    <div>
      {renderAppBar({tabs$})}
      {renderToolbar()}
      <div class="flex">
        <div class="w-full">{editorEl}</div>
        <div class="w-full">{previewEl}</div>
      </div>
    </div>
  )
}
