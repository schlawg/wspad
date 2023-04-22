let ws: WebSocket;
let editor: HTMLTextAreaElement;
let pingTimeout: number;

window.onload = () => {
  editor = document.querySelector('#text') as HTMLTextAreaElement;
  editor.oninput = (e: any) => {
    send(e.target.value);
  };
  connect();
};

function connect() {
  ws = new WebSocket(`ws://${window.location.host}/_ws${window.location.pathname}`);
  ws.binaryType = 'arraybuffer';
  ws.onopen = e => {
    editor.disabled = false;
  };
  ws.onmessage = function (e) {
    if (typeof e.data !== 'string') return; // pong
    onMessage(e);
    schedulePing();
  };
  ws.onclose = e => {
    editor.disabled = true;
    clearTimeout(pingTimeout);
    setTimeout(connect, 5000);
  };
  ws.onerror = function (e) {
    editor.disabled = true;
    onError(e);
  };
}

function schedulePing() {
  clearTimeout(pingTimeout);
  if (ws.readyState !== WebSocket.OPEN) ws.close();
  else
    pingTimeout = setTimeout(() => {
      ws.send(new Int32Array(1));
      schedulePing();
    }, 30000);
}
function send(text: string) {
  ws.send(text);
  schedulePing();
}
function onMessage(e: any) {
  editor.value = e.data;
  schedulePing();
}

function onError(e: any) {
  console.log(e);
}
