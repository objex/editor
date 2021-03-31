import {h} from "../../utils"
import {addTab, mountTabs} from "../tabs";
import {renderAppBar} from "../appBar";
import {renderToolbar} from "../toolbar";
import Split from 'split.js'

const tabs$ = mountTabs();
tabs$.subscribe();
addTab({name: "Home", closable: false});

export function renderApp() {
  let editorEl = <div class="w-full" style="height: calc(100vh - 84px)"/>;
  let previewEl = <div class="w-full overflow-y-auto" style="height: calc(100vh - 84px)"/>;

  (window as any).editorEl = editorEl;
  (window as any).previewEl = previewEl;

  setTimeout(() => {
    Split([editorEl, previewEl], {
      gutterSize: 5,
    });
  }, 100);

  return (
    <div>
      {renderAppBar({tabs$})}
      {renderToolbar()}
      <div class="flex relative">
        {editorEl}
        {previewEl}
      </div>
    </div>
  )
}
