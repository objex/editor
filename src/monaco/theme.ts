import * as monaco from '../../node_modules/monaco-editor';

const colors = {
    "black": "#1b1f23",
    "white": "#fff",
    "gray": ["#fafbfc", "#f6f8fa", "#e1e4e8", "#d1d5da", "#959da5", "#6a737d", "#586069", "#444d56", "#2f363d", "#24292e"],
    "blue": ["#f1f8ff", "#dbedff", "#c8e1ff", "#79b8ff", "#2188ff", "#0366d6", "#005cc5", "#044289", "#032f62", "#05264c"],
    "green": ["#f0fff4", "#dcffe4", "#bef5cb", "#85e89d", "#34d058", "#28a745", "#22863a", "#176f2c", "#165c26", "#144620"],
    "yellow": ["#fffdef", "#fffbdd", "#fff5b1", "#ffea7f", "#ffdf5d", "#ffd33d", "#f9c513", "#dbab09", "#b08800", "#735c0f"],
    "orange": ["#fff8f2", "#ffebda", "#ffd1ac", "#ffab70", "#fb8532", "#f66a0a", "#e36209", "#d15704", "#c24e00", "#a04100"],
    "red": ["#ffeef0", "#ffdce0", "#fdaeb7", "#f97583", "#ea4a5a", "#d73a49", "#cb2431", "#b31d28", "#9e1c23", "#86181d"],
    "purple": ["#f5f0ff", "#e6dcfd", "#d1bcf9", "#b392f0", "#8a63d2", "#6f42c1", "#5a32a3", "#4c2889", "#3a1d6e", "#29134e"],
    "pink": ["#ffeef8", "#fedbf0", "#f9b3dd", "#f692ce", "#ec6cb9", "#ea4aaa", "#d03592", "#b93a86", "#99306f", "#6d224f"]
}

function getColors(style: 'dark' | 'light') {
    if (style === "dark") {
        /* The array of light to dark colors are reversed to auto-generate dark theme */
        const darkColors: any = {};
        Object.entries(colors).forEach(([name, val]) => {
            if (name === "black") {
                darkColors.white = val;
            } else if (name === "white") {
                darkColors.black = val;
            } else {
                darkColors[name] = [...val].reverse();
            }
        });
        return darkColors;
    } else {
        return colors;
    }
}

export function getTheme(style: 'dark' | 'light'): monaco.editor.IStandaloneThemeData {
    const pick = (options: { light: string, dark: string }) => options[style];
    const primer = getColors(style);

    return {
        base: (style === 'dark' ? 'vs-dark' : 'vs'),
        inherit: true,
        colors: {
            'editor.foreground': pick({ light: primer.gray[9], dark: primer.gray[7] }),
            'editor.background': pick({ light: primer.white, dark: primer.gray[0] }),
        },
        rules: [
            {
                token: 'markup.heading',
                foreground: primer.blue[6],
                fontStyle: "bold"
            },
            {
                token: 'entity.name',
                foreground: primer.blue[6],
                fontStyle: "bold"
            },
            {
                token: 'keyword.js',
                foreground: pick({ light: primer.red[5], dark: primer.red[6] })
            },
            {
                token: 'operators',
                foreground: pick({ light: primer.red[5], dark: primer.red[6] })
            },
            {
                token: 'comment',
                foreground: pick({ light: primer.gray[5], dark: primer.gray[4] }),
            },
            {
                token: 'tag', 
                foreground: primer.green[6]
            },
            {
                token: 'number',
                foreground: primer.blue[6]
            },
            {
                token: 'string',
                foreground: pick({ light: primer.blue[8], dark: "#9ecbff" })
            },
            {
                token: 'string.html',
                foreground: pick({ light: primer.blue[8], dark: "#9ecbff" })
            },
            {
                token: 'string.yaml',
                foreground: pick({ light: primer.blue[8], dark: "#9ecbff" })
            },
            {
                token: 'namespace.yaml',
                foreground: pick({ light: primer.purple[5], dark: primer.purple[6] })
            },
            {
                token: 'type.yaml',
                foreground: primer.green[6]
            },
            {
                token: 'attribute.name',
                foreground: pick({ light: primer.purple[5], dark: primer.purple[6] })
            },
            // {token: 'identifier.js', foreground: '#D73A49'},
        ]
    }
}