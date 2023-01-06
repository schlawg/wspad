import $ from 'cash-dom';

var websocket: WebSocket;
window.onload = init;
function init() {
  $('#text').on('input', (e: any) => {
    send(e.target.innerHTML);
  });
  connect();
}
function connect() {
  const wsHost = "ws://" + window.location.host + "/_ws" + window.location.pathname;
  websocket = new WebSocket(wsHost);
  websocket.onmessage = function (evt) { onMessage(evt) };
  websocket.onerror = function (evt) { onError(evt) };
};

function send(text: string) {
  websocket.send(text);
}
function disconnect() {
  websocket.close();
};
function onMessage(e: any) {
  $('#text')[0]!.innerHTML = e.data;
};

function onError(e: any) {
  console.log(e);
};
