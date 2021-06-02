import { useEffect } from "react";
import { printLog } from '../logger/Logger.js'

/**
 * @brief   Websocket
 */

// Get ELGO_Client's local IP
const accessURL = (window.location.href).split("http://")[1];
const accessIP = accessURL.split(":")[0];

var accessWS = 'ws://';
accessWS += accessIP;
accessWS += ':9412';

const URL = accessWS;
export const websocket = new WebSocket(URL);
export default function RemoteWebsocket() {
    useEffect(() => {
        websocket.onopen = () => {
            printLog('Webscoket is Connected');
        }

        websocket.onmessage = (event) => {
            printLog(event.type, event.data);
        }

        websocket.onclose = () => {
            printLog('Websocket is Disconnected');
        }

        websocket.onerror = (error) => {
            printLog('Socket encountered error : ', error, 'Closing socket');
            websocket.close();
        }
    }, []);
}

/**
 * Websocket Send Message
 */
export const sendMessage = (data) =>{
    printLog(data);
    websocket.send(data);
}