import * as React from 'react';
import { Project } from './ProjectDescriptionView';

export interface File {
    name: string;
    icon: string;
    size: string;
    projects: {
        [key: string]: Project;
    }
}

interface AppProps {
    file: File;
    setProject: Function;
    setPage: Function;
    backPage?: number
}

const ProjectLayoutView = ( { file, setPage, setProject, backPage }: AppProps ) => {
    if (!backPage) backPage = 0;


    function toMainWindow(){
        setPage(backPage);
    }

    return (
        <div className='w-full h-full'>
            <span onClick={toMainWindow} className='text-white pt-4 pl-4 mb-[-2rem] text-2xl block cursor-pointer hover:text-gray-400'>&lt; To Homepage</span>
            <h1 className='text-center text-white font-bold text-3xl pt-6 font-bold pb-12'>{file.name}</h1>

            {file && (
            <div className='px-8 flex flex-wrap justify-center'>
                {Object.keys(file.projects).map((name, ind) => {
                    let proj = file.projects[name];
                    return (
                        <div key={ind} className='proj-item relative flex flex-col items-center text-white m-8 hover:scale-110 transition-transform duration-400 ease w-64' onClick={() => setProject(name)}>
                            <img src={proj.images.length > 0 ? proj.images[0] : ''} alt="" className='w-64 h-64 object-cover object-center shadow-lg shadow-gray-600 border-2 border-gray-200 rounded-md' />
                            <span className='absolute top-0 left-0 text-gray-900 w-full font-bold bg-[rgba(255,255,255,0.8)] text-center p-2 rounded-t-md'>{name}</span>
                            <span className='proj-sdesc text-left p-3 absolute bottom-0 left-0 w-full text-gray-900 bg-white rounded-b-md text-sm'>{proj.shortDesc}</span>
                        </div>
                    )
                })}
            </div>
            )}
        </div>
    )
}

export default ProjectLayoutView