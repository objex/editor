import { loadMonaco } from "./_";
import { getTheme } from './theme';
import { registerMarkdown, MonacoMarkdownExtension } from './markdown';

export async function mountMonacoEditor(editorEl: HTMLElement) {
    await loadMonaco();
    if (!window.monaco) {
        return;
    }

    /* ---------------
     * Regsiter Theme
     * --------------- */
    window.monaco.editor.defineTheme('github-dark', getTheme('dark'));
    window.monaco.editor.defineTheme('github-light', getTheme('light'));

    if (window.localStorage.getItem('osTheme') === 'dark') {
        window.monaco.editor.setTheme('github-light');
    } else {
        window.monaco.editor.setTheme('github-light');
    }


    /* ------------------
     * Regsiter Langauge
     * ------------------ */
    registerMarkdown(window.monaco);


    /* ------------------
     * Create Editor Model
     * ------------------ */

    let model = window.monaco.editor.createModel([
        `# Header 1 #
## Header 2 ##
### Header 3 ###
## Markdown plus h2 with a custom ID ##
[Link back to H2](#id-goes-here)

\`\`\`js
var x = "string";
function f() {
return x;
}
\`\`\`

<!-- html madness -->
<div class="custom-class" markdown="1">
<div>
nested div
</div>

This is a div _with_ underscores
and a & <b class="bold">bold</b> element.

<style>
body { font: "Consolas" }
</style>
</div>

* Bullet lists are easy too
- Another one
+ Another one

This is a paragraph, which is text surrounded by
whitespace. Paragraphs can be on one
line (or many), and can drone on for hours.

Now some inline markup like _italics_,  **bold**,
and \`code()\`. Note that underscores
in_words_are ignored.

\`\`\`\`json
{ value: ["or with a mime type"] }
\`\`\`\`

> Blockquotes are like quoted text in email replies
>> And, they can be nested

1. A numbered list
2. Which is numbered
3. With periods and a space

And now some code:

// Code is just text indented a bit
which(is_easy) to_remember();

And a block

~~~
// Markdown extra adds un-indented code blocks too

if (this_is_more_code == true && !indented) {
// tild wrapped code blocks, also not indented
}
~~~

Text with
two trailing spaces
(on the right)
can be used
for things like poems

### Horizontal rules

* * * *

--------------------------

## Markdown plus tables ##

| Header | Header | Right  |
| ------ | ------ | -----: |
|  Cell  |  Cell  |   $10  |
|  Cell  |  Cell  |   $20  |

* Outer pipes on tables are optional
* Colon used for alignment (right versus left)

## Markdown plus definition lists ##

Bottled water
: $ 1.25
: $ 1.55 (Large)

Milk
Pop
: $ 1.75

* Multiple definitions and terms are possible
* Definitions can include multiple paragraphs too

*[ABBR]: Markdown plus abbreviations (produces an <abbr> tag)`
    ].join('\n'), "pymarkdown");

    /* --------------------
     * Mount editor to DOM
     * -------------------- */

    let editor = window.monaco.editor.create(editorEl, {
        // language: 'markdown-math',
        wordWrap: 'on',
        automaticLayout: true,
        fontFamily: "'Fira Code'",
        fontSize: 13,
        fontLigatures: true,
        // lineHeight: '20%',
        // theme: 'owl-light',
        smoothScrolling: true,
        minimap: {
            enabled: false
        },
        model,
    });


    /* ----------------------------
     * Activate Markdown Extension
     * ---------------------------- */
    new MonacoMarkdownExtension().activate(editor, window.monaco);
}