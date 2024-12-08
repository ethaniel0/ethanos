import * as React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Project } from './types';
import { FirebaseStorage } from 'firebase/storage';
import * as dbUtils from './DbUtils';
import Markdown from 'react-markdown'
import { useEffect } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeRaw  from "rehype-raw";
import rehypeUnwrapImages from './wrapFigure';


interface PopupProps {
    proj: Project,
    close: Function,
    storage: FirebaseStorage
}


const Popup = ({proj, close, storage}: PopupProps) => {
    const [closing, setClosing] = React.useState<boolean>(false);
    const [imageAvailable, setImageAvailable] = React.useState<boolean>(false);

    function back(){
        setClosing(true);
        setTimeout(() => {
            close();
            setClosing(false);
        }, 300);
    }

    useEffect(() => {
        setImageAvailable(true);
        for (let img of proj.images) {
            if (img.img.startsWith('http')){
                continue;
            }
            dbUtils.loadImage(storage, img.img).then((url) => {
                img.img = url;
            })
        }
    }, [proj, storage]);

    return (
        <div
            className={"project-preview" + (closing ? ' close' : '')}
        style={{
            background: `linear-gradient(108deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.19) 100%)`, 
            boxShadow: '-3px 4px 13px -1px rgba(0, 0, 0, 0.40)',
        }}>
                
            <div className='p-2 w-full bg-white/40 rounded-md overflow-auto'
                style={{
                    boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.30)',
                }}>
                <div className='w-full flex justify-between'>
                    <button onClick={() => back()} className='text-xl font-black'>Back</button>
                    <button onClick={() => {
                        navigator.clipboard.writeText(window.location.origin + '/Present/' + encodeURIComponent(proj.displayTitle));
                    }} className='text-xl font-black'>Share</button>
                </div>
                

                <h1 className='text-3xl font-extrabold text-center w-full'>{proj.title}</h1>
                <div className='text-center pb-2'>
                    {proj.link && <span className='text-lg'>Check it out <a href={proj.link} target='_blank' rel="noreferrer" className='text-blue-600 font-bold'>here!</a></span>}
                </div>
                
                <div className='@container flex flex-col gap-4 w-full overflow-auto'>
                    <div className='h-1/3'>
                        {
                        imageAvailable &&
                        <Swiper
                        autoHeight={true}
                        slidesPerView={1}
                        spaceBetween={200}
                        loop={true}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper w-full"
                        >
                            {
                                proj.images.map((img, ind) => (
                                    <SwiperSlide key={ind} className='flex flex-col items-center'>
                                        {img.img.split('?')[0].endsWith('.mp4') ? (
                                            <video controls>
                                                <source src={img.img} type='video/mp4' />
                                            </video>
                                        ) : (
                                            <img key={ind} src={img.img} alt="" className='max-h-[30rem]' />
                                        )}
                                        <span className='block text-black text-center mt-2 text-xl'>{img.caption}</span>
                                    
                                    </SwiperSlide>
                                    )
                                )
                            }
                        </Swiper>
                        }
                        
                    </div>
                    <div className='w-full flex justify-center'>
                        <div className='w-full @xl:w-7/12 prose popup-markdown'>
                            {/* <p className='text-lg font-medium'>{proj.longDescription}</p> */}
                            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeUnwrapImages]} children={proj.longDescription}></Markdown>
                        </div>
                    </div>

                </div>
            </div>
                
                
                
        </div>
    )
}

export default Popup