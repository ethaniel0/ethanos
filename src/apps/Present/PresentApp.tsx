import * as React from 'react';
import { useState } from 'react';
import LandingPage from './LandingPage';
import ProjectView from './ProjectView';
import AllProjects from './AllProjects';


const PresentApp = ({file}: any) => {
    const [page, setPage] = useState(file ? 1 : 0);
    const [filename, setFile] = useState(file);
    return (
    <>
        {
            page === 0 ? 
            <LandingPage setFile={(fname: string, page?: number) => {setFile(fname); setPage(page || 1)}} />
            : page === 1 ?
            <ProjectView filePath={filename} setPage={setPage} />
            :
            <AllProjects filePath={filename} setPage={setPage} />

        }
    </>
    )
}

export default PresentApp