import { useEffect} from "react";

/**
 * Websocket
 */
const URL = "ws://192.168.0.103:9412";
export const websocket = new WebSocket(URL);
var response = null;
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
export const sendMessage = async (data) =>{
    console.log(data);
    websocket.send(data);
}

export const getResponse = () =>{
    return response;
}