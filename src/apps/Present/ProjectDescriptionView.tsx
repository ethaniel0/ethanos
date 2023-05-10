import * as React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

export interface Project {
    name: string;
    description: string;
    shortDesc: string;
    url: string;
    images: string[];
    captions: string[];
    technologies: string[];
}

interface PDVProps {
    back: React.MouseEventHandler,
    project: Project
}

const ProjectDescriptionView = ({back, project}: PDVProps) => {
  return (
    <div>
        <span onClick={back} className='text-white pt-4 pl-4 mb-[-1rem] text-2xl block cursor-pointer hover:text-gray-400'>Back</span>
                <div className='flex justify-center'>
                    <h1 style={{maxWidth: '80%'}} className={'text-center text-white font-bold text-3xl pt-6 font-bold' + (project.url ? ' pb-4' : ' pb-2 sm:pb-12')}>{project.name}</h1>
                </div>
                {
                    project.url && <span className='text-center block text-white text-xl pb-8'>Check it out <a href={project.url} target='_blank' className='text-orange-400'>here</a></span>
                }

                <Swiper
                    autoHeight={true}
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper mb-8 w-full @lg:w-[60%]"
                >
                    {
                        project.images.map((img, ind) => (
                            <SwiperSlide key={ind} className='flex-col'>
                                {img.endsWith('.mp4') ? (
                                    <video controls>
                                        <source src={img} type='video/mp4' />
                                    </video>
                                ) : (
                                    <img key={ind} src={img} alt="" />
                                )}
                                <span className='block text-white text-center mt-2 text-xl'>{project.captions[ind]}</span>
                               
                            </SwiperSlide>
                            )
                        )
                    }
                </Swiper>

                <div className='flex justify-center'>
                    <span className='text-white text-xl text-justify block px-12 w-11/12 @xl:w-5/12 min-w-[30rem]' >{project.description}</span>
                </div>
    </div>
  )
}

export default ProjectDescriptionView