import {h} from "../../utils"
import {addTab, mountTabs} from "../tabs";
// import {renderAppBar} from "../appBar";
import {renderToolbar} from "../toolbar";
import {mountMonacoEditor} from '../../monaco';
import Split from 'split.js'

const tabs$ = mountTabs();
tabs$.subscribe();
addTab({name: "Home", closable: false});

export function renderApp() {
  let editorEl = <div class="w-full" style="height: calc(100vh - 40px)"/>; // 84px;
  let previewEl = <article class="px-4 md-content__inner md-typeset max-w-screen-md mx-auto"/>;
  let previewElWrapper = <div class="w-full overflow-y-auto" style="height: calc(100vh - 40px)">
      {previewEl}
  </div>;

  // (window as any).editorEl = editorEl;
  mountMonacoEditor(editorEl);
  (window as any).previewEl = previewEl;

  setTimeout(() => {
    Split([editorEl, previewElWrapper], {
      gutterSize: 5,
    });
  }, 100);

  return (
    <div>
      {/*{renderAppBar({tabs$})}*/}
      {renderToolbar()}
      <div class="flex relative">
        {editorEl}
        {previewElWrapper}
      </div>
    </div>
  )
}
