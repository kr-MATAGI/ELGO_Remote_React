import { cloneElement, useEffect } from "react";

/**
 * Websocket
 */
 
const clientSocket = new WebSocket("ws://192.168.0.83:9412");
var response = null;
export default function RemoteWebsocket() {
    useEffect(() => {    
        clientSocket.onopen = () => {
            console.log("Socket is opened");
        }

        clientSocket.onerror = (error) => {
            console.log(error);
        }

        clientSocket.onmessage = (message) => {
            response = JSON.parse(message);
            console.log(response);
        }

        clientSocket.onclose = () => {
            console.log("Socket is closed");
        }

        clientSocket.addEventListener("test", () => {
            console.log("test EventListener");
        })
    }, []);
}