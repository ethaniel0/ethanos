import * as React from 'react';
import { useState, useEffect } from 'react';

interface Project {
    name: string;
    description: string;
    shortDesc: string;
    url: string;
    images: string[];
    technologies: string[];
}

interface File {
    name: string;
    icon: string;
    size: string;
    projects: {
        [key: string]: Project;
    }
}

interface AppProps {
    filePath: string;
    width: number;
    height: number;
}

const ProjectView = ( { filePath, width }: AppProps ) => {
    const [file, setFile] = useState({
        name: "Web Dev Projects",
        icon: "/assets/icons/present-web.svg",
        size: "10kB",
        projects: {}
    } as File);

    useEffect(() => {
        async function loadFile() {
            let resp = await fetch(filePath);
            let json = await resp.json();
            setFile(json);
        }
       loadFile();
    }, [filePath]);


    return (
        <div className='pb-12' style={{fontFamily: 'Quicksand', backgroundColor: '#242A3E', minHeight: '100%'}}>
            <h1 className='text-center text-white font-bold text-3xl pt-6 font-bold pb-12'>{file.name}</h1>
            {file && (
            <div className='px-8'>
                {Object.keys(file.projects).map((name, ind) => {
                    let proj = file.projects[name];
                    return (
                        <div key={ind} className={'proj-list flex items-center text-white' + (width < 600 ? ' column' : '')}>
                            <img src={proj.images.length > 0 ? proj.images[0] : ''} alt="" className='w-56 h-56 shadow-lg shadow-gray-600 border-2 border-gray-200 hover:scale-105 transition-transform duration-400 ease rounded-md' />
                            <div className='w-1/2'>
                                <span className='text-2xl font-semibold mb-4 block'>{name}</span>
                                <span>{proj.shortDesc}</span>
                            </div>
                            

                        </div>
                    )
                })}
            </div>
            )}
        </div>
    )
}

export default ProjectView