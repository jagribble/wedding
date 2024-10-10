import { useRef, useCallback } from "react";
import Webcam from "react-webcam";


export default function Memories() {
    const videoConstraints = {
        width: window.document.body.clientWidth,
        height: window.document.body.offsetHeight,
        // facingMode: "user"
    };
    console.log(videoConstraints)
    const webcamRef = useRef<Webcam>(null);
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current?.getScreenshot();
            console.log(imageSrc);
        },
        [webcamRef]
    );
    return (
        <>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}

            />
            <button onClick={capture}>Capture photo</button>
        </>
    )
}