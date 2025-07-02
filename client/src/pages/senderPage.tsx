import { useEffect, useState } from "react"

export default function Sender() {

    const [socket, setSocket] = useState<null | WebSocket>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000");
        socket.onopen = () => {
            socket.send(JSON.stringify({ type: 'sender' }))
        }

        setSocket(socket);

    }, []);

    async function handleSendVideo() {
        if (!socket) return;
        // todo
        //  create rtcpeerconncetion
        //  create offer
        //  setlocal description to offer
        //  send the offer to broswer 2

        const pc = new RTCPeerConnection();
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        socket?.send(JSON.stringify({ type: "createOffer", sdp: offer }));

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            if (message.type === "createAnswer") {
                pc.setRemoteDescription(message.sdp);
            }
        }

    }

    return (
        <div>
            <h1>Sender</h1>
            <button onClick={handleSendVideo}>Send Video</button>
        </div>
    )
}