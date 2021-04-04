import { renderApp } from "./components";
import { loadMarkdownParser, parseMarkdown } from './pyodide';
import { renderMathInText } from './utils/katex';
import { animationFrameScheduler, from, Subject } from 'rxjs'
import { debounceTime, observeOn, switchMap } from "rxjs/operators";

const app = renderApp();

document.getElementById('app').appendChild(app);

loadMarkdownParser().then(() => {
    const content$ = new Subject();
    (window as any).model.onDidChangeContent(() => {
        content$.next((window as any).model.getValue());
    })

    content$
        .pipe(
            debounceTime(250),
            switchMap((text: string) => {
                return from(parseMarkdown(text)); 
            }),
            observeOn(animationFrameScheduler)
        )
        .subscribe(async (markup) => {
            (window as any).previewEl.innerHTML = renderMathInText(markup);
        });


    content$.next((window as any).model.getValue());
});

window.__setTheme = () => {
    console.log("HERE1")
    if (window.monaco) {
        if (window.localStorage.getItem('osTheme') === 'dark') {
            console.log("HERE2")
            window.monaco.editor.setTheme('github-dark');
        } else {
            console.log("HERE3")
            window.monaco.editor.setTheme('github-light');
        }
    }
}
