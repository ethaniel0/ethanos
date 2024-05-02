import * as React from 'react';
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, Firestore } from 'firebase/firestore/lite';
import * as dbUtils from './DbUtils';
import { Project } from './types';
import ProjectListTab from './editor/ProjectListTab';
import ProjectEditTab from './editor/ProjectEditTab';

interface SecretEditProps {
    back: () => void;
}

export const SecretEdit = ({back}: SecretEditProps) => {
    const [db, setDb] = useState<Firestore>(null); // Firestore, Storage
    const [provider, _] = useState(new GoogleAuthProvider());
    const [projects, setProjects] = useState<Project[]>([]);
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>(-1);

    async function loadProjects(){
        if (!db) return;
        let projects = await dbUtils.loadProjects(db, true);
        for (let project of projects){
            for (let image of project.images){
                image.id = image.index;
            }
        }
        setProjects(projects);
    }

    function signIn(){
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            setSignedIn(true);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    useEffect(() => {
        const app = initializeApp(dbUtils.firebaseConfig);
        setDb(getFirestore(app));
    }, []);

    useEffect(() => {
        if (signedIn) loadProjects();
    }, [signedIn])

    return (
        <div className='bg-white h-full rounded-md p-4 overflow-auto'>
            {
                !signedIn ? 
                <div className='w-full h-full grid place-items-center'>
                    <button onClick={signIn} className='border-2 border-black px-4 py-2 rounded-md text-xl'>Login</button>
                </div>
                :
                selected == -1 ?
                <ProjectListTab projects={projects} select={setSelected} db={db} reloadPage={loadProjects} back={back} />
                :
                <ProjectEditTab project={projects[selected]} db={db} reload={loadProjects} back={() => setSelected(-1)} />
            }
        </div>
    )
}
