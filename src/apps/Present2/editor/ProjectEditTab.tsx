import { ReactSortable } from "react-sortablejs";
import * as React from 'react'
import { CaptionedImage, Project } from '../types';
import { useEffect, useState } from 'react';
import { StorageReference, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Firestore, doc, updateDoc } from 'firebase/firestore/lite';
import styles from '../PresentEdits.module.css';
import deleteIcon from '../assets/images/delete.svg';

interface ProjectEditTabProps{
    project: Project;
    db: Firestore;
    reload: () => void;
    back: () => void;
}
const ProjectEditTab = ({ project, db, reload, back }: ProjectEditTabProps) => {
    const yearParts = project.year.split('-');
    if (yearParts.length === 1) yearParts.push(yearParts[0]);

    const [title, setTitle] = useState<string>(project.title);
    const [displayTitle, setDisplayTitle] = useState<string>(project.displayTitle);
    const [yearStart, setYearStart] = useState<number>(parseInt(yearParts[0]));
    const [yearEnd, setYearEnd] = useState<number>(parseInt(yearParts[1]));
    const [link, setLink] = useState<string>(project.link);
    const [shortDescription, setShortDescription] = useState<string>(project.shortDescription);
    const [longDescription, setLongDescription] = useState<string>(project.longDescription);
    const [displayImg, setDisplayImg] = useState<string>(project.displayImg);
    const [images, setImages] = useState<CaptionedImage[]>(project.images);
    const [needsToSave, setNeedsToSave] = useState<boolean>(false);

    const [loadedImages, setLoadedImages] = useState<string[]>([]);

    async function uploadImage(ref: StorageReference, uri: string){
        let response = await fetch(uri);
        let blob = await response.blob();
        await uploadBytes(ref, blob);
        let url = await getDownloadURL(ref);
        return url;
    }

    async function save(){
        console.log('saving');
        var updatedProject: any = {}
        // save title
        if (title !== project.title) updatedProject['title'] = title;
        if (displayTitle !== project.displayTitle) updatedProject['displayTitle'] = displayTitle;
        if (yearStart !== parseInt(yearParts[0]) || yearEnd !== parseInt(yearParts[1])) updatedProject['year'] = `${yearStart}-${yearEnd}`;
        if (link !== project.link) updatedProject['link'] = link;
        if (shortDescription !== project.shortDescription) updatedProject['shortDescription'] = shortDescription;
        if (longDescription !== project.longDescription) updatedProject['longDescription'] = longDescription;

        const storage = getStorage();
        const imagesRef = ref(storage, 'Present');

        if (!displayImg.startsWith('https://firebasestorage.googleapis.com/')){
            const fileRef = ref(imagesRef, `${project.id}/displayImg`);
            let url = await uploadImage(ref(imagesRef, `${project.id}/displayImg`), displayImg);
            updatedProject['displayImg'] = url;
        }
        updatedProject['images'] = [...images];
        // reupload images array regardless, upload any new images
        for (let i = 0; i < images.length; i++){
            let str = loadedImages[i];
            if (!str.startsWith('https://firebasestorage.googleapis.com/')){
                const fileRef = ref(imagesRef, `${project.id}/img${i}.${ str.split(';')[0].split('/')[1] }`);
                let url = await uploadImage(fileRef, str);
                updatedProject['images'][i].img = url;
            }
        }
        var docRef = doc(db, "Apps/Present/Projects", project.id);
        await updateDoc(docRef, updatedProject);
        reload();
        setNeedsToSave(false);
    }

    useEffect(() => {
        if (project.title !== title ||
            project.displayTitle !== displayTitle ||
            project.year !== `${yearStart}-${yearEnd}` ||
            project.link !== link ||
            project.shortDescription !== shortDescription ||
            project.longDescription !== longDescription ||
            project.displayImg !== displayImg ||
            project.images !== images) {
            setNeedsToSave(true);
        } else {
            setNeedsToSave(false);
        }
    }, [project, title, displayTitle, yearStart, yearEnd, link, shortDescription, longDescription, displayImg, images]);

    useEffect(() => {
        let storage = getStorage();
        if (project.displayImg){
            let imagesRef = ref(storage, project.displayImg);
            getDownloadURL(imagesRef).then((url) => {
                setDisplayImg(url);
            });
        }
        if (project.images){
            (async () => {
                let loadedImgs: string[] = [];
                for (let i = 0; i < project.images.length; i++) {
                    let img = project.images[i];
                    if (!img.img) continue;
                    let imagesRef = ref(storage, img.img);
                    let url = await getDownloadURL(imagesRef);
                    loadedImgs.push(url);
                }
                setLoadedImages(loadedImgs);
            })();
        }
    }, [project.displayImg, project.images]);

    function updateDisplayImage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        // generate an input element and click it]
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: Event) => {
            const file = (e as unknown as React.ChangeEvent<HTMLInputElement>).target.files[0];
            if (!file) return;
            // don't save to storage, just get the url for now and save it
            const reader = new FileReader();
            reader.onload = async (e) => {
                const url = e.target.result;
                setDisplayImg(url as string);
            }
            reader.readAsDataURL(file);
        }
        input.click();
    }

    function updateImage(ind: number) {
        // generate an input element and click it]
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,video/*';
        input.onchange = (e: Event) => {
            const file = (e as unknown as React.ChangeEvent<HTMLInputElement>).target.files[0];
            if (!file) return;
            // don't save to storage, just get the url for now and save it
            const reader = new FileReader();
            reader.onload = async (e) => {
                const url = e.target.result;
                let newImages = [...loadedImages];
                newImages[ind] = url as string;
                setLoadedImages(newImages);
            }
            reader.readAsDataURL(file);
        }
        input.click();
    }

    function addImage(){
        setImages([...images, {img: "", caption: "", index: images.length, id: images.length}])
        setLoadedImages([...loadedImages, ""]);
    }

    function setImageList(state: CaptionedImage[]){
        let loadedImagesNew = state.map(p => loadedImages[p.index]);
        for (let i = 0; i < state.length; i++){
            state[i].index = i;
            state[i].id = i;
        }
        setLoadedImages(loadedImagesNew);
        setImages(state);
        setNeedsToSave(true);
    }

    return (
        <div className='w-full pb-2'>
            <button onClick={back} className='font-bold text-xl ml-2'>Back</button>
            <br />
            {
                needsToSave &&
                <button onClick={save} className='bg-green-200 border-2 border-green-800 px-2 py-px text-xl ml-2 rounded-md'>Save</button>
            }
            <table className={'text-xl border-separate border-spacing-2 ' + styles.table}>
                <tbody>
                    <tr>
                        <td>Title:</td>
                        <td>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Display Title:</td>
                        <td>
                            <input type="text" value={displayTitle} onChange={e => setDisplayTitle(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Year:</td>
                        <td>
                            <input type="number" value={yearStart} onChange={e => setYearStart(parseInt(e.target.value))} />
                            <span> - </span>
                            <input type="number" value={yearEnd} onChange={e => setYearEnd(parseInt(e.target.value))} />
                        </td>
                    </tr>
                    <tr>
                        <td>Link:</td>
                        <td>
                            <input type="text" value={link} onChange={e => setLink(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Short Description:</td>
                        <td>
                            <textarea name="" id="" value={shortDescription} onChange={e => setShortDescription(e.target.value)}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Long Description:</td>
                        <td>
                            <textarea name="" id="" rows={8} value={longDescription} onChange={e => setLongDescription(e.target.value)}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Display Image</td>
                        <td>
                            <img src={displayImg} alt="Display Image" className='border-2 border-gray-300 rounded-md text-lg w-36 h-36' />
                            <button onClick={updateDisplayImage} className='text-base text-blue-700'>Upload New Image</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className='ml-2'>
                <span className='font-bold text-xl mb-4 block'>Images</span>

                <ReactSortable list={images} setList={setImageList} className='flex flex-col gap-2'>
                    {
                        images.map((p, ind) => (
                            <div className='flex gap-2'>
                            <button onClick={() => {
                                let imgs = images.slice(); 
                                imgs.splice(ind, 1); 
                                setImages(imgs);
                            }}>
                                <img src={deleteIcon} alt="" className='w-8' />
                            </button>
                            <div className='w-48 h-36 grid place-items-center'>
                                <img onClick={_ => updateImage(ind)} src={loadedImages[ind]} alt="Display Image" className='border-2 border-gray-300 rounded-md text-lg object-contain w-48 h-36' />
                            </div>
                            
                            <textarea value={p.caption} onChange={(e => {
                                let imgs = images.slice(); 
                                imgs[ind].caption = e.target.value; 
                                setImages(imgs)
                            })} className='border-2 border-black rounded-md' />
                        </div>
                        ))
                    }
                    <button onClick={addImage} className='px-2 py-1 border-2 border-black rounded-md'>Add Image</button>
                </ReactSortable>
            </div>
        </div>
    )
}

export default ProjectEditTab