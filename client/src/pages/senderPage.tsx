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
        pc.onnegotiationneeded = async () => {
            console.log("on negotian");
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket?.send(JSON.stringify({ type: "createOffer", sdp: offer }));
        }


        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.send(JSON.stringify({ type: 'addIceCandidate', candidate: event.candidate }))
            }
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            if (message.type === "createAnswer") {
                pc.setRemoteDescription(message.sdp);
            }

            if (message.type === "addIceCandidate") {
                pc.addIceCandidate(message.candidate);
            }
        }

        // send video 
        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
        pc.addTrack(stream.getVideoTracks()[0])

    }

    return (
        <div>
            <h1>Sender</h1>
            <button onClick={handleSendVideo}>Send Video</button>
        </div>
    )
}