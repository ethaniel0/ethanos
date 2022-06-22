import * as React from 'react';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";



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

    useEffect(() => {
        async function loadFile() {
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
        <div className='pb-12' style={{fontFamily: 'Avenir', backgroundColor: '#242A3E', minHeight: '100%'}}>
            {
                viewProject === '' ?
            <>
                <span onClick={toMainWindow} className='text-white pt-4 pl-4 mb-[-2rem] text-2xl block cursor-pointer hover:text-gray-400'>&lt; To Homepage</span>
                <h1 className='text-center text-white font-bold text-3xl pt-6 font-bold pb-12'>{file.name}</h1>

                {file && (
                <div className='px-8 flex flex-wrap justify-center'>
                    {Object.keys(file.projects).map((name, ind) => {
                        let proj = file.projects[name];
                        return (
                            <div key={ind} className='proj-item relative flex flex-col items-center text-white m-8 hover:scale-110 transition-transform duration-400 ease w-64' onClick={() => setViewProject(name)}>
                                <img src={proj.images.length > 0 ? proj.images[0] : ''} alt="" className='w-64 h-64 object-cover object-center shadow-lg shadow-gray-600 border-2 border-gray-200 rounded-md' />
                                <span className='absolute top-0 left-0 text-gray-900 w-full font-bold bg-[rgba(255,255,255,0.8)] text-center p-2 rounded-t-md'>{name}</span>
                                <span className='proj-sdesc text-left p-3 absolute bottom-0 left-0 w-full text-gray-900 bg-white rounded-b-md text-sm'>{proj.shortDesc}</span>
                            </div>
                        )
                    })}
                </div>
                )}
            </>
            : <>
                <span onClick={() => setViewProject("")} className='text-white pt-4 pl-4 mb-[-1rem] text-2xl block cursor-pointer hover:text-gray-400'>Back</span>
                <div className='flex justify-center'>
                    <h1 style={{maxWidth: '80%'}} className={'text-center text-white font-bold text-3xl pt-6 font-bold' + (file.projects[viewProject].url ? ' pb-4' : ' pb-2 sm:pb-12')}>{file.projects[viewProject].name}</h1>
                </div>
                {
                    file.projects[viewProject].url && <span className='text-center block text-white text-xl pb-8'>Check it out <a href={file.projects[viewProject].url} target='_blank' className='text-orange-400'>here</a></span>
                }

                <Swiper
                    autoHeight={true}
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    // pagination={{
                    //   clickable: true,
                    // }}
                    navigation={true}
                    modules={[Navigation]}
                    className={"mySwiper mb-8" + (width > 768 ? ' width-big' : ' width-small')}
                >
                    {
                        file.projects[viewProject].images.map((img, ind) => (
                            <SwiperSlide key={ind} className='flex-col'>
                                {img.endsWith('.mp4') ? (
                                    <video controls>
                                        <source src={img} type='video/mp4' />
                                    </video>
                                ) : (
                                    <img key={ind} src={img} alt="" />
                                )}
                                <span className='block text-white text-center mt-2 text-xl'>{file.projects[viewProject].captions[ind]}</span>
                               
                            </SwiperSlide>
                            )
                        )
                    }
                </Swiper>

                <div className='flex justify-center'>
                    <span className={'text-white text-xl text-justify block px-12' + (width > 768 ? ' w-5/12' : ' w-11/12')} >{file.projects[viewProject].description}</span>
                </div>

            </>
            }
        </div>
    )
}

export default ProjectView