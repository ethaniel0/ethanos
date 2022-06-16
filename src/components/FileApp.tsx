import * as React from 'react'
import { useState, useEffect } from 'react'
import CommandLine from './CommandLine';

interface AppProps {
    path: string;
    name: string;
    index: number
}

const FileApp = ({ path, name, index }: AppProps) => {
    const cmd = new CommandLine();

   const [app, setApp] = useState({icon: '', icon2: '', url: ''});

    useEffect(() => {
        async function loadApp(){   
            let resp = await fetch(name);
            let json = await resp.json();
            setApp(json);
        }
        loadApp();
    }, []);

    function stopProp(e: any){
        e.stopPropagation();
        e.cancelBubble = true;
    }

    return (
        <>
        {
            app.url ? 
            <a href={app.url} onClick={stopProp}><img src={app.icon2 ? app.icon2 : app.icon} alt="" className='w-12 h-12 ml-2' /></a>
            :
            <img src={app.icon2 ? app.icon2 : app.icon} alt="" className='w-12 h-12 ml-2' />
        }
        </>
    )
}

export default FileApp