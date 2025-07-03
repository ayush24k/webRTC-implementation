import { useEffect, useRef } from "react";

export default function Receiver() {

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000");

        socket.onopen = () => {
            socket.send(JSON.stringify({ type: 'receiver' }))
        }

        let pc: null | RTCPeerConnection = null;

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'createOffer') {
                pc = new RTCPeerConnection();

                pc.onicecandidate = (event) => {
                    console.log(event);
                    if (event.candidate) {
                        socket.send(JSON.stringify({ type: 'addIceCandidate', candidate: event.candidate }))
                    }
                }

                pc.ontrack = (event) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = new MediaStream([event.track]);
                    }
                }

                await pc.setRemoteDescription(message.sdp);
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);

                socket.send(JSON.stringify({ type: "createAnswer", sdp: answer }));
            }

            if (message.type === "addIceCandidate") {
                pc?.addIceCandidate(message.candidate);
            }
        }
    }, [])

    return (
        <div>
            Receiver
            <video autoPlay playsInline muted width={400} height={400} ref={videoRef}></video>
        </div>
    )
}