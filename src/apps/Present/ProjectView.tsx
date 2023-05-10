import * as React from 'react';
import { useState, useEffect } from 'react';
import ProjectDescriptionView from './ProjectDescriptionView';
import ProjectLayoutView from './ProjectLayoutView';
import { File } from './ProjectLayoutView';

interface AppProps {
    filePath: string;
    setPage: Function;
    backPage?: number
}

const ProjectView = ( { filePath, setPage, backPage }: AppProps ) => {
    if (!backPage) backPage = 0;
    const [file, setFile] = useState({
        name: "Web Dev Projects",
        icon: "/assets/icons/present-web.svg",
        size: "10kB",
        projects: {}
    } as File);

    const [viewProject, setViewProject] = useState("");

    useEffect(() => {
        async function loadFile() {
            let resp = await fetch(filePath);
            let json = await resp.json();
            setFile(json);
        }
       loadFile();
    }, [filePath]);

    return (
        <div className='pb-12' style={{fontFamily: 'Avenir', backgroundColor: '#242A3E', minHeight: '100%'}}>
            {
                viewProject === '' ?
                <ProjectLayoutView file={file} setProject={setViewProject} setPage={setPage} />
                : <ProjectDescriptionView back={() => setViewProject("")} project={file.projects[viewProject]} />
            }
        </div>
    )
}

export default ProjectView