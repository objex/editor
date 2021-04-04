import { loadPyodide, Pyodide } from './build/pyodide.js';

let pyodide: Pyodide;

const mdExtensions = [
    'footnotes',
    'def_list',
    'toc',
    'pymdownx.arithmatex',
    'pymdownx.betterem',
    'pymdownx.caret',
    'pymdownx.critic',
    'pymdownx.details',
    'pymdownx.inlinehilite',
    'pymdownx.magiclink',
    'pymdownx.mark',
    'pymdownx.smartsymbols',
    'pymdownx.superfences',
    'pymdownx.tasklist',
    'pymdownx.tilde',
    // 'pymdownx.pathconverter',
    'admonition',
    'meta',
    'codehilite',
    'tables',
];

const mdExtensionsConfig = {
    // 'pymdownx.pathconverter': {
    //     'base_path': '/GCS/POST_STORAGE_BUCKET/BLOG_NAME/POST_SLUG/',
    //     'absolute': true,
    //     'tags': 'img',
    // },
    'toc': {
        'marker': '',
        'permalink': true,
    },
    'pymdownx.arithmatex': {
        'generic': true,
    },
    'pymdownx.betterem': {
        'smart_enable': 'all',
    },
    'pymdownx.tasklist': {
        'custom_checkbox': 'true',
    }
}

export async function loadMarkdownParser() {
    pyodide = await loadPyodide({ indexURL: './dist/pyodide/build/' });
    await pyodide.runPythonAsync(`
    from markdown import Markdown
    import json

    MD_EXTENSIONS = ${JSON.stringify(mdExtensions)}
    MD_EXTENSIONS_CONFIG = json.loads('${JSON.stringify(mdExtensionsConfig)}')
    `);
}

export function parseMarkdown(markdown: string): Promise<string> {
    return pyodide.runPythonAsync(`
md = Markdown(extensions=MD_EXTENSIONS, extension_configs=MD_EXTENSIONS_CONFIG)
md.convert("""${markdown.replace(/\\/g, '\\\\')}""")`,
        () => { },
        (e) => { console.error(e); }
    );
}
