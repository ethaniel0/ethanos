import * as React from 'react';
import { useState, useEffect } from 'react';
import Directory from '../../components/Directory';
import ProjectDescriptionView from './ProjectDescriptionView';
import ProjectLayoutView from './ProjectLayoutView';
import { File } from './ProjectLayoutView';

interface AppProps {
    filePath: string;
    setPage: Function;
}

const AllProjects = ( { filePath, setPage }: AppProps ) => {
    const [file, setFile] = useState({
        name: "All Projects",
        icon: "",
        size: "",
        projects: {}
    } as File);

    const [viewProject, setViewProject] = useState("");

    let files = ['web.pres', 'applications.pres', 'electrical.pres', 'research.pres']

    useEffect(() => {
        async function loadFiles() {
            let allProjects = Object.assign({}, file);

            let cwd = new Directory('/E/User/Desktop');
            for (let filepath of files){
                let file = cwd.getFile(filepath);
                let resp = await fetch(file);
                let json = await resp.json();
                Object.assign(allProjects.projects, json.projects);
            }
            setFile(allProjects);
        }
       loadFiles();
    }, [filePath]);

    return (
        <div className='pb-12' style={{fontFamily: 'Avenir', backgroundColor: '#242A3E', minHeight: '100%'}}>
            {
                viewProject === '' ?
            <ProjectLayoutView file={file} setPage={setPage} setProject={setViewProject} />
            : <ProjectDescriptionView project={file.projects[viewProject]} back={() => setViewProject("")} />
            }
        </div>
    )
}

export default AllProjects