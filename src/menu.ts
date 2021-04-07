const {app, Menu, dialog, BrowserWindow} = require('electron').remote;
const fs = require('fs');
// const isDev = require('electron-is-dev');

/**
 * Just a hack to replace uri of existing model without losing the undo redo stack
 * @param path
 */
function setModelUri(path: string) {
  const {Uri, editor} = window.monaco;
  const oldModel = window.model
  const newModel = editor.createModel(oldModel.getValue(), 'pymarkdown', Uri.parse(path));

  let cm2 = (newModel as any)._commandManager;
  let cm1 = (oldModel as any)._commandManager;
  let temp;

  // SWAP currentOpenStackElement
  temp = cm2.currentOpenStackElement;
  cm2.currentOpenStackElement = cm1.currentOpenStackElement;
  cm1.currentOpenStackElement = temp;

  // SWAP past
  temp = cm2.past;
  cm2.past = cm1.past;
  cm1.past = temp;

  // SWAP future
  temp = cm2.future;
  cm2.future = cm1.future;
  cm1.future = temp;

  window.model = newModel;
  window.editor.setModel(newModel);
  oldModel.dispose();
}

const fileFilters = [
  {
    "name": "markdown",
    "extensions": ["md"]
  },
  {
    "name": "text",
    "extensions": ["txt"]
  },
  {
    "name": "all",
    "extensions": ["*"]
  },
];

const isMac = process.platform === 'darwin';

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      {
        label: 'New File',
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          if (!window.model) {
            return;
          }

          window.model = window.monaco.editor.createModel('', 'pymarkdown');
          window.editor.setModel(window.model);
        }
      },
      {
        label: 'Open File...',
        accelerator: 'CmdOrCtrl+O',
        click: () => {
          if (!(window as any).model) {
            return;
          }

          const currentWindow = BrowserWindow.getFocusedWindow();
          let path = dialog.showOpenDialogSync(currentWindow, {
            openFile: true,
            multiSelections: false,
            filters: fileFilters
          });

          if (path) {
            let data = fs.readFileSync(path[0], 'utf8');
            const {Uri, editor} = window.monaco;
            let oldModel = window.model;

            window.model = editor.createModel(data, 'pymarkdown', Uri.parse('file://' + path[0]));
            window.editor.setModel(window.model);

            oldModel.dispose();

            currentWindow.setTitle(path + ' -- Objex Editor');
          }
        }
      },
      {type: 'separator'},
      {role: 'recentDocuments'},
      {role: 'clearRecentDocuments'},
      {type: 'separator'},
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: () => {
          if (!window.model) {
            return;
          }

          const currentWindow = BrowserWindow.getFocusedWindow();
          let path;

          if (window.model.uri.scheme === 'inmemory') {
            console.log(window.model.uri);

            path = dialog.showSaveDialogSync(currentWindow, {
              title: 'Save As',
              filters: fileFilters
            });
            setModelUri('file://' + path);
          } else {
            path = window.model.uri.fsPath;
          }
          currentWindow.setTitle(path + ' -- Objex Editor');
          fs.writeFileSync(path, window.model.getValue());
        }
      },
      {
        label: 'Save as...',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: () => {
          if (!window.model) {
            return;
          }

          const currentWindow = BrowserWindow.getFocusedWindow();
          let path = dialog.showSaveDialogSync(currentWindow, {
            title: 'Save As',
            filters: fileFilters
          });

          if (path) {
            fs.writeFileSync(path, window.model.getValue());
            currentWindow.setTitle(path + ' -- Objex Editor');
            setModelUri('file://' + path);
          }
        }
      },
      {type: 'separator'},
      isMac ? {role: 'close'} : {role: 'quit'}
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      ...(isMac ? [
        {role: 'delete'},
        {role: 'selectAll'},
        {type: 'separator'},
      ] : [
        {role: 'delete'},
        {type: 'separator'},
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      {role: 'resetZoom'},
      {role: 'zoomIn'},
      {role: 'zoomOut'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      {role: 'minimize'},
      {role: 'zoom'},
      ...(isMac ? [
        {type: 'separator'},
        {role: 'front'},
        {type: 'separator'},
        {role: 'window'}
      ] : [
        {role: 'close'}
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      ...(isMac ? [
        {type: 'separator'},
      ] : []),
      {role: 'reload'},
      {role: 'forceReload'},
      {role: 'toggleDevTools'},
    ]
  }
];

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu);
