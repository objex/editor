const {shell} = require('electron');
const {ipcRenderer} = require('electron');
const fsPromises = require('fs').promises;
const path = require('path');

let publishing = false;

export function getImages(markdown: string, filePath: string) {
  const images = markdown.matchAll(/!\[[^\]]*]\((.*?)(?=[")])(".*")?\)/g);
  const files = [];
  const basePath = filePath.split('/').slice(0, -1).join('/');

  for (let image of images) {
    files.push([image[1], path.join(basePath, image[1])]);
  }

  return files;
}

export async function publishToRabbito() {
  if (!window.model) return;

  const authToken = localStorage.getItem('authToken');
  const blogSlug = localStorage.getItem('blogSlug');

  if (!authToken || !blogSlug) {
    publishing = true;
    shell.openExternal("http://localhost:4200/authenticate-editor");
    return;
  }
  publishing = false;

  const formData = new FormData();

  const markdownFile = new Blob([window.model.getValue()], {
    type: 'text/plain'
  });

  const images = getImages(window.model.getValue(), window.model.uri.fsPath);
  for (let image of images) {
    const file = await fsPromises.readFile(image[1]);
    formData.append(image[0].split('.')[0], new Blob([file]), image[0]);
  }
  formData.append('markdown', markdownFile, "markdown.md");

  const xml = new XMLHttpRequest();
  // xml.open('POST', `http://localhost:5001/rabbito-dev/us-central1/posts/blogs/${blogSlug}/posts`);
  xml.open('POST', `https://api.rabbito.io/posts/v1/${blogSlug}/posts`);
  xml.setRequestHeader("idToken", authToken);
  // xml.setRequestHeader("Authorization", "Bearer " + authToken);
  xml.send(formData as any);
}

ipcRenderer.on('authToken', async (evt: any, message: any) => {
  message.data.split('//')[1].split('&').map((part: string) => ({
    key: part.split('=')[0],
    value: part.split('=')[1]
  })).forEach(({key, value}: { key: string, value: string }) => {
    localStorage.setItem(key, value);
  });

  if (publishing) {
    await publishToRabbito();
  }
});
