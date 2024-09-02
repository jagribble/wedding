import { Masonry } from '@mui/lab';
import { useCallback, useEffect, useState } from 'react';
export default function Uploads() {
    const [items, setItems] = useState([]);

    const getItems = useCallback(async () => {
        const res = await fetch('https://api.emmaandjules.info/downloads');
        const json = await res.json();
        setItems(json.filter(x => !x.includes('mov') && !x.includes('mp4')));
    }, []);

    useEffect(() => {
        getItems();
    }, []);

    return (
        <Masonry columns={3} spacing={2}>
            {items.map(x => (
                <div key={x}>
                    <img src={`https://api.emmaandjules.info/${x}`} width={(window.document.body.clientWidth / 3) - 16} />
                </div>
            ))}
        </Masonry>
    )
}