import * as React from 'react';
import { useState } from 'react';

interface AppProps {
    images: string[];
    captions: string[];
    width: number;
}

const ImageTurnstile = (props: AppProps) => {
    const images = props.images;
    const captions = props.captions;
    const width = props.width;
    const [index, setIndex] = useState(0);

    const imgHeight = width * 0.25;

    return (
        <>
        {images.length <= 2 
            ? 
            images.map((img, ind) => (
                <div className='m-4'>
                    {img.endsWith('.mp4') ? (
                        <video style={{height: imgHeight + 'px', minHeight: '20rem'}} className="rounded-lg object-cover" controls>
                            <source src={img} type='video/mp4' />
                        </video>
                    ) : (
                        <img key={ind} src={img} alt="" style={{height: imgHeight + 'px', minHeight: '20rem'}} className="rounded-lg object-cover" />
                    )}
                    <span className='text-white text-center block w-full'>{captions[ind]}</span>
                </div>
            
            ))
            :
            <div className='flex justify-center relative'>
                {
                images.map((img, ind) => (
                    <div style={{display: 'block', maxWidth: '1%'}}>
                        <div className={'proj-img relative float-left' + (ind === index ? '' : ' w-52')} 
                            onClick={() => {setIndex(ind)}}
                            style={{
                                zIndex: 10 - Math.abs(index - ind), 
                                left: (ind - index)*8 + 'rem', 
                                transform: 'translateX(-50%)'
                                }}
                        >
                            {img.endsWith('.mp4') ? (
                                <video style={{height: imgHeight + 'px', minHeight: '20rem', maxWidth: 'none'}} className="rounded-lg object-fit block" controls>
                                    <source src={img} type='video/mp4' />
                                </video>
                            ) : (
                                <img key={ind} src={img} alt="" style={{height: imgHeight + 'px', minHeight: '20rem', maxWidth: 'none'}} className="rounded-lg object-fit block" />
                            )}
                            {
                                ind === index && <span className='text-white text-center block m-0 p-2'>{captions[ind]}</span>
                            }
                        </div>
                    </div>
                
                ))
                }
            </div>
        }
        </>
    )
}

export default ImageTurnstile