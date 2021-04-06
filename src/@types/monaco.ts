import * as monaco from '../../node_modules/monaco-editor';

export {};

declare global {
    interface Window {
        monaco?: typeof monaco;
        editor?: monaco.editor.IStandaloneCodeEditor;
        model?: monaco.editor.ITextModel;
        __setTheme?: () => void;
    }    
}
