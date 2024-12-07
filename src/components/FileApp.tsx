import * as React from 'react'
import { useState, useEffect } from 'react'

interface AppProps {
    path: string;
    name: string;
    index: number
}

const FileApp = ({name}: AppProps) => {
   const [app, setApp] = useState({icon: '', icon2: '', url: ''});

    useEffect(() => {
        let isCancelled = false;
        async function loadApp(){   
            let resp = await fetch(name);
            let json = await resp.json();
            if (!isCancelled){
                setApp(json);
            }
        }
        loadApp().catch(console.error);

        return () => {
            isCancelled = true;
          };
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