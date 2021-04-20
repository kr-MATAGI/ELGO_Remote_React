import { useEffect} from "react";

/**
 * Websocket
 */
const URL = "ws://192.168.0.92:9412";
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
    }, []);
}

/**
 * Websocket Send Message
 */
export const sendMessage = (data) =>{
    console.log(data);
    websocket.send(data);
}