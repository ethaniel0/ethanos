import * as React from 'react'

interface Project {
    name: string;
    description: string;
    url: string;
    images: string[];
    technologies: string[];
}

interface File {
    name: string;
    icon: string;
    size: string;
    projects: Project[];
}

interface AppProps {
    file: File;
    width: number;
    height: number;
}

const ProjectView = ( { file }: AppProps ) => {
    console.log(file);
    return (
        <div>ProjectView</div>
    )
}

export default ProjectView