export var clientWebsocket = new WebSocket('ws://192.168.0.83:9412');
var clientStats = {
    ip: "localhost",
    bIsConnected : false
}

/**
 * Websocket
 */
export default function RemoteWebsocket() {
    clientWebsocket.onopen = () => {
        clientStats.bIsConnected = true;
        console.log('Remote Client Socket is open');
    }

    clientWebsocket.onclose = () => {
        clientStats.bIsConnected = false;
        console.log('Remote Client Socket is closed');
    }

    clientWebsocket.onerror = (error) => {
        console.log(error);
    }

    clientWebsocket.onmessage = (response) => {
        console.log(response);
    }
}

/**
 * 
 */
export const sendDataToServer = (data) => {
    if(clientWebsocket.OPEN === clientWebsocket.readyState) {
        let jsonData = JSON.stringify(data);
        clientWebsocket.send(jsonData);
        console.log(jsonData);
    }
    else {
        console.log('Error - ReadyState : ' + clientWebsocket.readyState);
    }
}