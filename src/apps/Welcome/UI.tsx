import * as React from 'react'
import { useState } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';

interface UIProps {
    closeWindow: Function;
}

const UI = ({ closeWindow }: UIProps) => {
    const [page, setPage] = useState(0);
    const [firstLoad, setFirstLoad] = useState(true);

    function toPage(newpage: number){
        setPage(newpage);
        setFirstLoad(false);
    }

    return (
        <div id='welcome-window' className='w-full h-full overflow-hidden'>
            <Page2 closeWindow={closeWindow} active={page==1} animate={!firstLoad} />
            <Page1 toPage={toPage} active={page==0} animate={!firstLoad} />
        </div>
    )
}

export default UI