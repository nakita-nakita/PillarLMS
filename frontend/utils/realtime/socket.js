'use-client'

import io from 'socket.io-client';

let socket;
const isBrowser = typeof window !== "undefined";
let socketId;

function getCookieValue(cookieName) {
  let result = document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
  return result && result[1];
}

function initSocket() {
  if (!socket) {
    const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_WEB_API_URL;
    const authToken = getCookieValue("authToken");
    socket = io(SOCKET_SERVER_URL, {
      query: {
        authToken,
      },
      transports: ['websocket'],
    });
  }
  return socket;
}

function getSocketId() {
  return socketId
}

function setSocketId(id) {
  socketId = id
}

export { initSocket, getSocketId, setSocketId };
