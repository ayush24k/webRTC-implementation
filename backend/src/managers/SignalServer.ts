import { WebSocket } from "ws";

/* 
todo here:
 identify sender or reciever
 createOffer
 createAnswer
 Add ice candidate (interactivly connnection establishement)

 done!
*/

interface MessageInterface {
    type: string,
    sdp?: string,
    candidate?: string,
}

class SignalServer {
    private senderSocket: null | WebSocket = null;
    private receiverSocket: null | WebSocket = null;

    private createOffer (socket: WebSocket, message: MessageInterface) {
        if (socket !== this.senderSocket) {
            return;
        }
        this.receiverSocket?.send(JSON.stringify({type: 'createOffer', sdp: message.sdp}))
    }

    private createAnswer (socket: WebSocket, message: MessageInterface) {
        if (socket !== this.receiverSocket) {
            return;
        }
        this.senderSocket?.send(JSON.stringify({type: 'createAnswer', sdp: message.sdp}));
    }

    private addIceCandidate (socket: WebSocket, message: MessageInterface) {
        if (socket === this.senderSocket) {
            this.receiverSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
        }

        if (socket === this.receiverSocket) {
            this.senderSocket?.send(JSON.stringify({type: 'iceCandidate', candidate: message.candidate}));
        }
    }

    constructor (socket: WebSocket) {
        socket.on('message', (data: any) => {
            const message: MessageInterface = JSON.parse(data);

            if (message.type === 'sender') {
                this.senderSocket = socket;
            } 

            if (message.type === 'receiver') {
                this.senderSocket = socket;
            }

            if (message.type === 'createOffer') {
                this.createOffer(socket, message);
            }

            if (message.type === 'createAnswer') {
                this.createAnswer(socket, message);
            }

            if (message.type === 'addIceCandidate') {
                this.addIceCandidate(socket, message);
            }

        });
    }
}

export default SignalServer;