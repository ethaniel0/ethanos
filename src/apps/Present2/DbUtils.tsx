import { Firestore, collection, getDocs, query, getDoc, doc, updateDoc } from "firebase/firestore/lite";
import { Project } from "./types";
import { FirebaseStorage, getDownloadURL, ref } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyD_MBSnOw5YjOxTX9CJAhDxce4XuDe5FwM",
    authDomain: "portfolio-c3034.firebaseapp.com",
    projectId: "portfolio-c3034",
    storageBucket: "portfolio-c3034.appspot.com",
    messagingSenderId: "537351044667",
    appId: "1:537351044667:web:f5283586962c6de2a0661e",
    measurementId: "G-N0ZHM52FS0"
};

export async function loadProjects(db: Firestore, signedIn?: boolean){
    if (!db) return;
    if (signedIn === undefined) signedIn = false;
    const presentRef = collection(db, "Apps/Present/Projects");
    const docRef = doc(db, "Apps/Present");
    const docSnap = await getDoc(docRef);
    let order = docSnap.data().Order;
    let pjs: Project[] = new Array<Project>(order.length);
    const q = query(presentRef);
    const snapshot = await getDocs(q);

    let altered = false;
    snapshot.forEach((doc) => {
        var data = doc.data();
        data.id = doc.id;
        let index = order.indexOf(doc.id);
        if (index === -1){
            order.push(doc.id);
            altered = true;
        }

        pjs[order.indexOf(doc.id)] = data as Project;
    });

    if (altered && signedIn){
        updateDoc(docRef, {
            Order: order
        });
    }
    return pjs;
}

export async function loadImage(storage: FirebaseStorage, path: string){
    if (path.trim() === '') return '';
    console.log('loading image:', path);
    let imagesRef = ref(storage, path);
    let url = await getDownloadURL(imagesRef);
    return url;
}