import * as React from 'react'
import { Project } from '../types';
import { Firestore, addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import { ReactSortable } from "react-sortablejs";
import { useEffect, useState } from 'react';

interface ProjectListTabProps {
    projects: Project[];
    select: (num: number) => void;
    db: Firestore;
    reloadPage: () => Promise<void>;
    back: () => void;
}
const ProjectListTab = ({ projects, select, db, reloadPage, back }: ProjectListTabProps) => {
    const [projectList, setProjectList] = useState(projects);
    function addProject(){
        let projectsCollection = collection(db, 'Apps/Present/Projects');
        addDoc(projectsCollection, {
            title: 'New Project',
            displayTitle: 'New Project',
            year: '2023-2023',
            link: '',
            shortDescription: '',
            longDescription: '',
            displayImg: '',
            images: []
        }).then(async (_) => {
            await reloadPage();
        });
    }
    useEffect(() => {
        setProjectList(projects);
    }, [projects]);

    function setList(state: Project[]){
        setProjectList(state);
        let order = state.map((p) => p.id);
        let prevOrder = projects.map((p) => p.id);
        if (order == prevOrder || order.length == 0) return;
        let docRef = doc(db, 'Apps/Present');
        updateDoc(docRef, {
            Order: order
        });
    }

    function removeProject(ind: number){
        console.log('removing project', ind);
        let projectsCollection = collection(db, 'Apps/Present/Projects');
        let project = projectList[ind];
        let docRef = doc(projectsCollection, project.id);
        console.log('deleting project', project.id);
        
        let newOrder = projectList.filter((_, i) => i != ind);
        updateDoc(docRef, {
            Order: newOrder
        }).then(() => {
            deleteDoc(docRef).then(async (_) => {
                await reloadPage();
            });
        });

    }

    return (
        <div className=''>
            <div className='w-full'>
                <button onClick={back} className='font-bold text-xl'>Back</button>
            </div>
            <ReactSortable list={projectList} setList={setList} className='flex flex-col gap-2'>
                {
                    projectList.map((p, ind) => (
                        <div key={ind}>
                            <span>|||</span> <button onClick={() => select(ind)} className='bg-gray-200 border-2 border-gray-600 px-4 py-2 rounded-md'>{p.displayTitle}</button> <button onClick={() => removeProject(ind)} className='bg-red-200 border-2 border-red-800 px-4 py-2 rounded-md'>-</button>
                        </div>
                    ))
                }
            </ReactSortable>

            <div>
                <button onClick={addProject} className='bg-green-200 border-2 border-green-800 px-4 py-2 rounded-md mt-2'>Add Project</button>
            </div>
            
        </div>
    )
}
export default ProjectListTab