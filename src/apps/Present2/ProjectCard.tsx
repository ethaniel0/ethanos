import * as React from 'react';
import { useState } from 'react';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Project } from './types';


interface ProjectCardProps {
    proj: Project,
    select: Function
}
const ProjectCard = ({proj, select}: ProjectCardProps) => {
    let [angle, setAngle] = useState<number>(108);
    let [rot, setRot] = useState<{x: number, y: number}>({x: 0, y: 0});

    function mouseMove(e: React.MouseEvent<HTMLElement, MouseEvent>){
        let x = e.clientX;
        let y = e.clientY;
        
        let rect = e.currentTarget.getBoundingClientRect();
        let centerX = rect.x + rect.width/2;
        let centerY = rect.y + rect.height/2;
        let angle = Math.atan2(y - centerY, x - centerX);
        let deg = angle * 180/Math.PI;
        setAngle(deg);

        setRot({
            x: 10* (x - centerX)/rect.width,
            y: 30* (y - centerY)/rect.height
        })
        
    }
    function mouseOut(){
        setAngle(108);
        setRot({
            x: 0,
            y: 0
        })
    }

    return (
        <div
            className="project-card" 
            onMouseMove={mouseMove} 
            onMouseOut={mouseOut} 
            onClick={() => select()}
            onKeyDownCapture={() => select()}
            style={{
                background: `linear-gradient(${angle}deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.19) 100%)`, 
                boxShadow: '-3px 4px 13px -1px rgba(0, 0, 0, 0.40)',
                transform: `rotateX(${rot.y}deg) rotateY(${rot.x}deg)`,
            }}>

            
            <div className='info'>
                <div className='flex flex-col gap-2' style={{width: '13rem'}}>
                    <span className='opacity-70 text-3xl font-medium'>{proj.displayTitle}</span>
                    <span className='opacity-70 text-base font-medium'>{proj.shortDescription}</span>
                </div>

                <div className='text-sm font-medium opacity-70'>{proj.year}</div>
            </div>
            <div className='p-2'>
                <div className='image' style={{backgroundImage: `url(${proj.displayImg})`}}></div>
            </div>
            
            
        </div>
  )
}

export default ProjectCard