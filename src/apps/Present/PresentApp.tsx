import * as React from 'react';
import { useState } from 'react';
import LandingPage from './LandingPage';
import ProjectView from './ProjectView';
import AllProjects from './AllProjects';


const PresentApp = ({size, file}: any) => {
    const [page, setPage] = useState(file ? 1 : 0);
    const [filename, setFile] = useState(file);
    return (
    <>
        {
            page === 0 ? 
            <LandingPage width={size[0]} height={size[1]} setFile={(fname: string, page?: number) => {setFile(fname); setPage(page || 1)}} />
            : page === 1 ?
            <ProjectView width={size[0]} height={size[1]} filePath={filename} setPage={setPage} />
            :
            <AllProjects width={size[0]} height={size[1]} filePath={filename} setPage={setPage} />

        }
    </>
    )
}

export default PresentApp