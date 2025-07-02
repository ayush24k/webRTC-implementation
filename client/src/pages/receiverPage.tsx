import { useEffect } from "react";

export default function Receiver() {

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000");
        socket.onopen = () => {
            socket.send(JSON.stringify({ type: 'receiver' }))
        }

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            const pc = new RTCPeerConnection();
            await pc.setRemoteDescription(message.sdp);

            const answer = await pc.createAnswer();
            const sdp = await pc.setLocalDescription(answer);

            socket.send(JSON.stringify({type: 'createAnswer', sdp: sdp}));
        }
    }, [])

    return (
        <div>
            Receiver
        </div>
    )
}