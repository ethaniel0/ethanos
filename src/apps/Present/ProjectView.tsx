import * as React from 'react';
import { useState, useEffect } from 'react';
import ImageTurnstile from './ImageTurnstile';
import CommandLine from '../../components/CommandLine';

interface Project {
    name: string;
    description: string;
    shortDesc: string;
    url: string;
    images: string[];
    captions: string[];
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
    setPage: Function;
}

const ProjectView = ( { filePath, width, setPage }: AppProps ) => {
    const [file, setFile] = useState({
        name: "Web Dev Projects",
        icon: "/assets/icons/present-web.svg",
        size: "10kB",
        projects: {}
    } as File);

    const [viewProject, setViewProject] = useState("");

    const cmd = new CommandLine('/E/Applications');

    useEffect(() => {
        async function loadFile() {
            console.log(filePath);
            let resp = await fetch(filePath);
            let json = await resp.json();
            setFile(json);
        }
       loadFile();
    }, [filePath]);

    function toMainWindow(){
        setPage(0);
    }

    return (
        <div className='pb-12' style={{fontFamily: 'Quicksand', backgroundColor: '#242A3E', minHeight: '100%'}}>
            {
                viewProject === '' ?
            <>
                <span onClick={toMainWindow} className='text-white pt-4 pl-4 mb-[-2rem] text-2xl block cursor-pointer hover:text-gray-400'>&lt; To Homepage</span>
                <h1 className='text-center text-white font-bold text-3xl pt-6 font-bold pb-12'>{file.name}</h1>

                {file && (
                <div className='px-8'>
                    {Object.keys(file.projects).map((name, ind) => {
                        let proj = file.projects[name];
                        return (
                            <div key={ind} className={'proj-list flex items-center text-white' + (width < 600 ? ' column' : '')} onClick={() => setViewProject(name)}>
                                <img src={proj.images.length > 0 ? proj.images[0] : ''} alt="" className='w-56 h-56 object-cover object-center shadow-lg shadow-gray-600 border-2 border-gray-200 hover:scale-105 transition-transform duration-400 ease rounded-md' />
                                <div className='w-1/2'>
                                    <span className='text-2xl font-semibold mb-4 block'>{name}</span>
                                    <span>{proj.shortDesc}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                )}
            </>
            : <>
                <span onClick={() => setViewProject("")} className='text-white pt-4 pl-4 mb-[-2rem] text-2xl block cursor-pointer hover:text-gray-400'>Back</span>
                <h1 className={'text-center text-white font-bold text-3xl pt-6 font-bold' + (file.projects[viewProject].url ? ' pb-4' : ' pb-12')}>{file.projects[viewProject].name}</h1>
                {
                    file.projects[viewProject].url && <span className='text-center block text-white text-xl pb-8'>Check it out <a href={file.projects[viewProject].url} target='_blank' className='text-orange-400'>here</a></span>
                }
                <div className='flex flex-wrap px-8  mb-12 justify-center'>
                    <ImageTurnstile images={file.projects[viewProject].images} captions={file.projects[viewProject].captions} width={width} />
                </div>
                <span className='text-white text-xl text-center w-full block px-12' >{file.projects[viewProject].description}</span>
                

            </>
            }
        </div>
    )
}

export default ProjectView