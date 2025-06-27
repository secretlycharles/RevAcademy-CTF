  const dffPfqC = "U2FsdGVkX1+xVz5/q+8NBp2zFzXfMP9Qx5q7nipPdBUeJKh4X8h+1qj/0RwL9QZn",
    rmKadY = "123456" + "789012" + "3456";
  let w49cZdh = [
  222, 173, 190, 239, 250, 206, 219, 173, 222, 173, 190, 239, 250, 206, 219];

const CryptoJS = require('crypto-js');

// Decrypt to WordArray (raw bytes) instead of UTF-8 string
const decryptedWordArray = CryptoJS.AES.decrypt(dffPfqC, rmKadY);
console.log('Decrypted WordArray:', decryptedWordArray.toString());

// this thing was useless lol ? !