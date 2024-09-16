import * as React from 'react'
import { useState, useEffect } from 'react';

interface UIProps {
    file: string;
}

const UI = ({file}: UIProps) => {
    const [page, setPage] = useState(0);
    const [firstLoad, setFirstLoad] = useState(true);
    const [fileToView, setFileToView] = useState("");

    useEffect(() => {
        async function loadFileContent(){
            let resp = await fetch(file);
            let json = await resp.json();
            console.log(json);
            setFileToView(json.file);
        }

        loadFileContent();
    }, [file]);

    return (
        <div id='welcome-window' className='w-full h-full overflow-auto bg-white'>
            <embed src={fileToView} className='w-full h-full' />
        </div>
    )
}

export default UI