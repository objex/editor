export function loadScript(url: string) {
    return new Promise<void>((resolve, reject) => {
        let script = document.createElement('script');
        script.onload = () => {
            resolve();
        };
        script.onerror = (e) => {
            reject(e);
        };
        script.src = url;
        document.body.appendChild(script);
    });
}

export function loadMonaco() {
    (window as any).require = { paths: { 'vs': './node_modules/monaco-editor/min/vs' } };

    return Promise.all([
        loadScript('./node_modules/monaco-editor/min/vs/loader.js'),
        loadScript('./node_modules/monaco-editor/min/vs/editor/editor.main.nls.js'),
        loadScript('./node_modules/monaco-editor/min/vs/editor/editor.main.js'),
        // loadScript('./node_modules/monaco-markdown/umd/monaco-markdown.js'),
    ]);
}
