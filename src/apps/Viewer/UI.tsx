import * as React from 'react'
import { useState, useEffect } from 'react';

interface UIProps {
    file: string;
}

const UI = ({file}: UIProps) => {
    const [fileToView, setFileToView] = useState("");

    useEffect(() => {
        async function loadFileContent(){
            let resp = await fetch(file);
            let json = await resp.json();
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