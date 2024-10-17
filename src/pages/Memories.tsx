import { useRef, useCallback, useState, useMemo } from "react";
import Webcam from "react-webcam";
import { useWindowSize } from '@react-hook/window-size';
import { CircularProgress, Icon, IconButton } from "@mui/material";

export default function Memories() {
    const [width, height] = useWindowSize();
    const [loading, setLoading] = useState(true);
    const [facingCamera, setFacingCamera] = useState('environment')
    const videoConstraints = useMemo(() => ({
        width: { max: width },
        height: { max: height },
        audio: 'true',
        facingMode: facingCamera,
        aspectRatio: width / height

    }), [facingCamera]);
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
            {loading && <CircularProgress sx={{ position: 'absolute', top: '50', margin: 'auto' }} disableShrink />}
            <Webcam
                key={facingCamera}
                audio={false}
                width="100%"
                ref={webcamRef}
                screenshotFormat="image/png"
                videoConstraints={videoConstraints}
                onUserMedia={() => {
                    setLoading(false);
                }}
                style={{ position: 'absolute', zIndex: 999999, }}
            />
            {/* height: 'calc(100vh - 56px)' */}
            {!loading && (
                <>
                    <IconButton
                        onClick={capture}
                        sx={{
                            position: 'absolute',
                            left: '50%'
                        }}>
                        <Icon sx={{ position: 'fixed', bottom: 16, color: '#e19b9f', fontSize: '4.25rem', zIndex: 9999999 }}>circle</Icon>

                    </IconButton>
                    <IconButton
                        onClick={evt => {
                            evt.stopPropagation();
                            evt.preventDefault();
                            setFacingCamera(x => x === 'user' ? 'environment' : 'user')
                        }}
                        sx={{
                            position: 'absolute',
                            right: '5%',
                            top: 24
                        }}>
                        <Icon sx={{ position: 'fixed', color: 'white', fontSize: '2.25rem', zIndex: 99999999 }}>cameraswitch</Icon>

                    </IconButton >
                </>

            )}

        </>
    )
}