import { Button, TextField } from "@mui/material";
import { useCallback, useState } from "react"
import { systemUI } from "./ResponseForm";

export default function SendMessages() {
    const [message, setMessage] = useState('');

    const sendMessage = useCallback(() => {
        fetch('https://api.emmaandjules.info/push/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        })
    }, [message])

    return (
        <div style={{ display: 'flex' }}>
            <TextField sx={systemUI} value={message} fullWidth onChange={evt => setMessage(evt.target.value)} variant="outlined" margin="dense" />
            <Button sx={systemUI} variant="contained" onClick={sendMessage}>Send message</Button>
        </div>)
}