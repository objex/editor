const {shell} = require('electron');
const {ipcRenderer} = require('electron');

let publishing = false;

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

  const markdownFile = new Blob([window.model.getValue()], {
    type: 'text/plain'
  });

  const formData = new FormData();
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
