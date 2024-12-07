import * as React from 'react';
import bkg from './assets/bkg.png';
import ProjectCard from './ProjectCard';
import Popup from './Popup';
import { SecretEdit } from './SecretEdit';
import { useState, useEffect } from 'react';
import { getFirestore } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import * as dbUtils from './DbUtils';
import { Project } from './types';
import { FirebaseStorage, getStorage } from 'firebase/storage';


const PresentApp = ({file}: any) => {
    const [selected, setSelected] = useState<number>(-1);
    const [page, setPage] = useState<number>(0);
    const [projects, setProjects] = useState<Project[]>([]);
    const [storage, setStorage] = useState<FirebaseStorage>();

    useEffect(() => {
        const app = initializeApp(dbUtils.firebaseConfig);
        const db = getFirestore(app);
        let storage = getStorage(app);
        setStorage(storage);
        dbUtils.loadProjects(db).then(async projects => {
            setProjects(projects);
            for (let i = 0; i < projects.length; i++){
                if (projects[i].displayImg.startsWith('http')) continue;
                dbUtils.loadImage(storage, projects[i].displayImg).then(img => {
                    projects[i].displayImg = img;
                    setProjects([...projects]);
                })
            }

            for (let i = 0; i < projects.length; i++){
                if (projects[i].displayTitle == file){
                    setSelected(i);
                    break;
                }
            }
        });

    }, []);

    return (
        <div id="present2" className='relative w-full h-full p-4 flex flex-col overflow-y-auto' style={{backgroundImage: `url(${bkg})`, backgroundSize: 'cover'}}>
            <div className='flex flex-row justify-between'>
                <span className='font-semibold text-3xl'>
                    {
                        page === 0 ? 'Welcome. Look around!' : <>.... . .-.. .-.. --- &nbsp; &nbsp; - .... . .-. .</>
                    }
                </span>
                <span onClick={() => setPage(1 - page)} className='cursor-pointer text-transparent'>Log In</span>
            </div>
            
            {
                page === 0 && 
                <>
                    <div className='flex flex-wrap gap-4 mt-4 flex-grow overflow-auto'>
                    {
                        projects.map((proj, ind) => (
                            <ProjectCard key={'project-' + ind} proj={proj} select={() => setSelected(ind)} />
                        ))
                    }
                    </div>
                    {
                        selected !== -1 && 
                        <Popup proj={projects[selected]} close={() => setSelected(-1)} storage={storage} />
                    }  
                </>
            }
            {
                page === 1 &&
                <SecretEdit back={() => setPage(0)} />
            }
        </div>
    )
}

export default PresentApp