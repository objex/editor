import * as monaco from '../../node_modules/monaco-editor';

export {};

declare global {
    interface Window {
        monaco?: typeof monaco
        __setTheme?: () => void
    }    
}
