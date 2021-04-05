const {app, Menu, dialog, BrowserWindow} = require('electron').remote;
const fs = require('fs');
// const isDev = require('electron-is-dev');

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
          if (!(window as any).model) {
            return;
          }

          (window as any).model.setValue('');
        }
      },
      {
        label: 'New Window',
        accelerator: 'CmdOrCtrl+Shift+N',
      },
      {
        label: 'Open File...',
        accelerator: 'CmdOrCtrl+O',
        click: () => {
          if (!(window as any).model) {
            return;
          }

          let path = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
            openFile: true,
            multiSelections: false,
            filters: [
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
            ]
          });

          if (path) {
            let data = fs.readFileSync(path[0], 'utf8');
            (window as any).model.setValue(data.toString());
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
          console.log('Save');
        }
      },
      {
        label: 'Save as...',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: () => {
          if (!(window as any).model) {
            return;
          }

          let path = dialog.showSaveDialogSync(BrowserWindow.getFocusedWindow(),{
            title: 'Save As',
            filters: [
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
            ]
          });

          if (path) {
            fs.writeFileSync(path, (window as any).model.getValue());
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
      // ...(isDev ? [
        {role: 'reload'},
        {role: 'forceReload'},
        {role: 'toggleDevTools'},
        {type: 'separator'},
      // ] : []),
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
    submenu: [] as any[]
  }
];

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu);
