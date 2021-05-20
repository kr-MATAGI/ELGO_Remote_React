import { useEffect } from "react";

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
            console.log('Webscoket is Connected');
        }

        websocket.onmessage = (event) => {
            console.log(event.type, event.data);
        }

        websocket.onclose = () => {
            console.log('Websocket is Disconnected');
        }

        websocket.onerror = (error) => {
            console.log('Socket encountered error : ', error, 'Closing socket');
            websocket.close();
        }
    }, []);
}

/**
 * Websocket Send Message
 */
export const sendMessage = (data) =>{
    console.log(data);
    websocket.send(data);
}