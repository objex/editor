import { loadMonaco } from "./_";
import { getTheme } from './theme';
import { registerMarkdown, MonacoMarkdownExtension } from './markdown';
import {getInitialTextModel} from "./initialTextModel";

export async function mountMonacoEditor(editorEl: HTMLElement) {
    await loadMonaco();
    if (!window.monaco) {
        return;
    }

    /* ---------------
     * Register Theme
     * --------------- */
    window.monaco.editor.defineTheme('github-dark', getTheme('dark'));
    window.monaco.editor.defineTheme('github-light', getTheme('light'));

    if (window.localStorage.getItem('osTheme') === 'dark') {
        window.monaco.editor.setTheme('github-light');
    } else {
        window.monaco.editor.setTheme('github-light');
    }


    /* ------------------
     * Register Language
     * ------------------ */
    registerMarkdown(window.monaco);

    /* --------------------
     * Mount editor to DOM
     * -------------------- */

    let editor = window.monaco.editor.create(editorEl, {
        wordWrap: 'on',
        automaticLayout: true,
        fontFamily: "'Fira Code'",
        fontSize: 13,
        fontLigatures: true,
        smoothScrolling: true,
        minimap: {
            enabled: false
        },
    });

    window.editor = editor;
    window.model = getInitialTextModel();
    editor.setModel(window.model);
    // window.model.

    /* ----------------------------
     * Activate Markdown Extension
     * ---------------------------- */
    new MonacoMarkdownExtension().activate(editor, window.monaco);
}
