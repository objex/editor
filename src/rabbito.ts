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

  const data = new RawFormData();
  await data.append("markdown", markdownFile, "markdown.md");

  const formData = await data.getOutputDeferred();
  const xml = new XMLHttpRequest();
  xml.open('POST', `https://api.rabbito.io/posts/v1/${blogSlug}/posts/`);
  xml.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + data.getBoundary());
  xml.setRequestHeader("idToken", authToken);
  xml.send(formData as any);
}

ipcRenderer.on('authToken', async (evt: any, message: any) => {
  message.data.split('//')[1].split('&').map((part: string) => ({
    key: part.split('=')[0],
    value: part.split('=')[1]
  })).forEach(({key, value}: {key: string, value: string}) => {
    localStorage.setItem(key, value);
  });

  if (publishing) {
    await publishToRabbito();
  }
});

class RawFormData {
  private promises: Promise<any>[]
  private readonly boundry: string;

  constructor() {
    this.promises = [];
    this.boundry = this.makeBoundary();
  }

  getBoundary() {
    return this.boundry;
  }

  makeBoundary() {
    return 'MyBoundary' + window.btoa(Math.random().toString()).substr(0, 12);
  }

  append(name: string, val: string | number | File | Blob | boolean | null | undefined, filename: string) {
    let prom;

    if (val instanceof File || val instanceof Blob) {
      prom = this.readAsBinaryString(val).then(function (base64: string) {
        let contentType = val.type || 'application/octet-stream';
        return '--' + this._boundry + '\r\n' +
          'Content-Disposition: form-data; ' +
          'name="' + name + '"; filename="' + this.encode_utf8(filename || "blob") + '"\r\n' +
          'Content-Type: ' + contentType + '\r\n\r\n' +
          base64 + '\r\n';
      }.bind(this))
    } else {
      prom = new Promise(function () {
        return '--' + this._boundry + '\r\n' +
          'Content-Disposition: form-data; ' +
          'name="' + this.encode_utf8(name) + '"\r\n\r\n' +
          this.encode_utf8(val) + '\r\n'
      }.bind(this));
    }

    this.promises.push(prom);

    return prom;
  }

  readAsBinaryString(blob: File|Blob) {
    let reader = new FileReader();
    return new Promise(function (resolve) {
      let binStringCallback = function (e: any) {
        resolve(e.target.result);
      };

      let arrBufferCallback = function (e: any) {
        let binary = "";
        let bytes = new Uint8Array(e.target.result);
        let length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        resolve(binary);
      };

      reader.onerror = reader.onabort = function () {
        resolve(null);
      };

      if (typeof reader.readAsBinaryString != "undefined") {
        reader.onload = binStringCallback;
        reader.readAsBinaryString(blob);
      } else {
        reader.onload = arrBufferCallback;
        reader.readAsArrayBuffer(blob);
      }
    });
  }

  encode_utf8(s: string) {
    return unescape(encodeURIComponent(s));
  }

  getOutputDeferred() {
    return Promise.all(this.promises).then(function (rows: any[]) {
      let output = '--' + this._boundry + '\r\n';
      rows.forEach(function (row) {
        output += row;
      });
      output += '--' + this._boundry + '\r\n';
      return output;
    }.bind(this));
  }
}
