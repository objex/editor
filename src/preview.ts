import {animationFrameScheduler, from, Subject} from "rxjs";
import {debounceTime, observeOn, switchMap} from "rxjs/operators";
import {parseMarkdown} from "./pyodide";
import {renderMathInText} from "./utils";
import {editor} from "monaco-editor";
import IModel = editor.IModel;

const content$ = new Subject();

export function mountPreview(model: IModel) {
  content$.next(model.getValue());

  model.onDidChangeContent(() => {
    content$.next(model.getValue());
  });
}

content$
  .pipe(
    debounceTime(250),
    switchMap((text: string) => {
      const basePath = window.model.uri.fsPath.split('/').slice(0, -1).join('/');

      return from(parseMarkdown(text, basePath));
    }),
    observeOn(animationFrameScheduler)
  )
  .subscribe(async (markup) => {
    (window as any).previewEl.innerHTML = renderMathInText(markup);
  });
