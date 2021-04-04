import {editor} from 'monaco-editor';
import {activateFormatting} from "./formatting";
import {setWordDefinitionFor, TextEditor} from "./vscode-monaco";
import {activateListEditing} from "./listEditing";
import {MdCompletionItemProvider} from "./completion";
import {MarkdownDocumentFormatter} from "./tableFormatter";
import {language, conf} from './markdown';

export class MonacoMarkdownExtension {
    activate(editor: editor.IStandaloneCodeEditor, monaco: typeof window.monaco) {
        let textEditor = new TextEditor(editor)

        activateFormatting(textEditor, monaco);
        activateListEditing(textEditor, monaco);

        // Allow `*` in word pattern for quick styling
        setWordDefinitionFor(textEditor.languageId,
            /(-?\d*\.\d\w*)|([^\!\@\#\%\^\&\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s\，\。\《\》\？\；\：\‘\“\’\”\（\）\【\】\、]+)/g
        );
    }
}

export function registerMarkdown(monaco: typeof window.monaco) {
    let def = {
        id: 'pymarkdown',
		extensions: ['.md', '.markdown', '.mdown', '.mkdn', '.mkd', '.mdwn', '.mdtxt', '.mdtext'],
		aliases: ['Markdown', 'markdown'],
    }

    monaco.languages.register(def);
    monaco.languages.registerCompletionItemProvider(def.id, new MdCompletionItemProvider());
    monaco.languages.registerDocumentFormattingEditProvider(def.id, new MarkdownDocumentFormatter());
    monaco.languages.onLanguage(def.id, () => {
        monaco.languages.setMonarchTokensProvider(def.id, language);
		monaco.languages.setLanguageConfiguration(def.id, conf);
    });
}

// export function 
